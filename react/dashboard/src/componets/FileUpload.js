import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import * as XLSX from "xlsx";

function FileUpload({ onDataLoaded }) {
  const [fileName, setFileName] = useState(null);

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    setFileName(file.name);

    const reader = new FileReader();
    reader.onload = (event) => {
      const binaryStr = event.target.result;
      const workbook = XLSX.read(binaryStr, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const data = XLSX.utils.sheet_to_json(sheet);
      onDataLoaded(data); // 데이터를 부모 컴포넌트로 전달
    };
    reader.readAsBinaryString(file);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: ".xlsx, .xls",
    multiple: false,
  });

  return (
    <div {...getRootProps()} style={styles.dropzone}>
      <input {...getInputProps()} />
      <p>
        {fileName
          ? `파일 선택됨: ${fileName}`
          : "엑셀 파일을 여기에 드롭하거나 클릭하여 업로드하세요"}
      </p>
    </div>
  );
}

const styles = {
  dropzone: {
    border: "2px dashed #888",
    padding: "20px",
    textAlign: "center",
    cursor: "pointer",
    marginBottom: "20px",
    backgroundColor: "#f9f9f9",
  },
};

export default FileUpload;
