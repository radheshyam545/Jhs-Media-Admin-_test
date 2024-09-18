// CKEditorComponent.js
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const CKEditorComponent = ({ content, onChange }) => {
  return (
    <div className="bg-white p-4 rounded-lg border border-gray-300 mb-4">
      <CKEditor
        editor={ClassicEditor}
        data={content}
        onChange={(event, editor) => {
          const data = editor.getData();
          onChange(data);
        }}
        config={{
          toolbar: [
            'heading',
            '|',
            'bold',
            'italic',
            'link',
            'bulletedList',
            'numberedList',
            'blockQuote',
            'insertTable',
            'undo',
            'redo',
            'imageUpload'
          ]
        }}
      />
    </div>
  );
};

export default CKEditorComponent;
