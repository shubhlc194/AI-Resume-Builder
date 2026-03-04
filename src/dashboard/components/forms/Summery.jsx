import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import GlobalApi from './../../../../service/GlobalApi';
import { Brain, LoaderCircle } from 'lucide-react';
import { toast } from 'sonner';
import { GenerateAIResponse } from './../../../../service/AIModel';

const prompt = "Job Title: {jobTitle} , Depends on job title give me list of summery for 3 experience level, Mid Level and Fresher level in 3-4 lines in array format, With summery and experience_level Field in JSON Format"

function Summery({ enableNext }) {
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
    const [summery, setSummery] = useState("");
    const [loading, setLoading] = useState(false);
    const params = useParams();
    const [aiGeneratedSummeryList, setAiGenerateSummeryList] = useState();

    useEffect(() => {
        summery && setResumeInfo({
            ...resumeInfo,
            summery: summery
        })
    }, [summery])

    const GenerateSummeryFromAI = async () => {
    setLoading(true);
    const PROMPT = prompt.replace('{jobTitle}', resumeInfo?.jobTitle);
    
    try {
        const result = await GenerateAIResponse(PROMPT);
        console.log("Raw AI result:", result);
        
        // JSON array extract karo chahe backticks hon ya na hon
        const jsonMatch = result.match(/\[[\s\S]*\]/);
        if (!jsonMatch) throw new Error("No JSON found");
        
        const data = JSON.parse(jsonMatch[0]);
        console.log("Parsed Data:", data);
        setAiGenerateSummeryList(data);
    } catch (error) {
        console.error("AI Error:", error);
        toast("AI generation failed, please try again");
    } finally {
        setLoading(false);
    }
}

    const onSave = (e) => {
        e.preventDefault();
        setLoading(true);

        const data = {
            data: {
                summery: summery
            }
        }

       GlobalApi.updateResumeDetail(params?.resumeId, data).then(resp => {
            console.log(resp);
            enableNext(true);
            setLoading(false);
            toast("Details updated");
        }, (error) => {
            setLoading(false);
        })
    }

    return (
        <div>
            <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
                <h2 className='font-bold text-lg'>Summery</h2>
                <p>Add Summery for your job title</p>

                <form className='mt-7' onSubmit={onSave}>
                    <div className='flex justify-between items-end'>
                        <label>Add Summery</label>
                        <Button
                            variant="outline"
                            onClick={() => GenerateSummeryFromAI()}
                            type="button"
                            size="sm"
                            className="border-primary text-primary flex gap-2">
                            <Brain className='h-4 w-4' /> Generate from AI
                        </Button>
                    </div>
                    <Textarea
                        className="mt-5"
                        required
                        value={summery || resumeInfo?.summery || ""}
                        onChange={(e) => setSummery(e.target.value)}
                    />
                    <div className='mt-2 flex justify-end'>
                        <Button type="submit" disabled={loading}>
                            {loading ? <LoaderCircle className='animate-spin' /> : 'Save'}
                        </Button>
                    </div>
                </form>
            </div>

            {aiGeneratedSummeryList && (
                <div className='my-5'>
                    <h2 className='font-bold text-lg'>Suggestions</h2>
                    {aiGeneratedSummeryList?.map((item, index) => (
                        <div key={index}
                            onClick={() => setSummery(item?.summary)}
                            className='p-5 shadow-lg my-4 rounded-lg cursor-pointer'>
                            <h2 className='font-bold my-1 text-primary'>Level: {item?.experience_level}</h2>
                            <p>{item?.summary}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default Summery