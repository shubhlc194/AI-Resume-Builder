import { Button } from '@/components/ui/button';
import { Brain, LoaderCircle } from 'lucide-react';
import React, { useState, useEffect } from 'react'
import {
  BtnBold, BtnBulletList, BtnItalic, BtnLink,
  BtnNumberedList, BtnStrikeThrough, BtnUnderline,
  Editor, EditorProvider, Separator, Toolbar
} from 'react-simple-wysiwyg'
import { GenerateAIResponse } from './../../service/AIModel';
import { toast } from 'sonner';

const PROMPT = 'position title: {positionTitle} , give me ONLY 5-7 bullet points for resume experience section. Rules: NO heading, NO "Experience:" text, NO introduction line, ONLY bullet points in HTML <ul><li> tags, nothing else'
// ✅ positionTitle as direct prop - no resumeInfo needed
function RichTextEditor({ onRichTextEditorChange, index, defaultValue, positionTitle }) {
  const [value, setValue] = useState(defaultValue);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  const GenerateSummeryFromAI = async () => {
    // ✅ Direct prop se check - no more undefined error
    if (!positionTitle) {
      toast('Please Add Position Title');
      return;
    }

    setLoading(true);

    try {
      const prompt = PROMPT.replace('{positionTitle}', positionTitle);
      const result = await GenerateAIResponse(prompt);
      console.log("Raw AI result:", result);

      const cleanResult = result
        .replace(/```html/gi, '')
        .replace(/```/g, '')
        .trim();

      setValue(cleanResult);
      // ✅ Pass value directly - matches handleRichTextEditor(value, name, index)
      onRichTextEditorChange(cleanResult);
      toast.success("Generated successfully!");

    } catch (error) {
      console.error("AI Error:", error);
      toast.error("Generation failed, please try again");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <div className='flex justify-between my-2'>
        <label className='text-xs'>Summary</label>
        <Button
          variant="outline"
          size="sm"
          onClick={GenerateSummeryFromAI}
          disabled={loading}
          className="flex gap-2 border-primary text-primary"
        >
          {loading ? (
            <LoaderCircle className='animate-spin' />
          ) : (
            <>
              <Brain className='h-4 w-4' /> Generate from AI
            </>
          )}
        </Button>
      </div>

      <EditorProvider>
        <Editor
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            onRichTextEditorChange(e.target.value);
          }}
        >
          <Toolbar>
            <BtnBold />
            <BtnItalic />
            <BtnUnderline />
            <BtnStrikeThrough />
            <Separator />
            <BtnNumberedList />
            <BtnBulletList />
            <Separator />
            <BtnLink />
          </Toolbar>
        </Editor>
      </EditorProvider>
    </div>
  )
}

export default RichTextEditor;