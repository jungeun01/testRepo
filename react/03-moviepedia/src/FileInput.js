import React, { useEffect, useRef, useState } from "react";
import placeholderImg from "./assets/preview-placeholder.png";
import "./FileInput.css";
import resetImg from "./assets/ic-reset.png";

function FileInput({ inputName, setFile, value }) {
  const [preview, setPreview] = useState();
  const inputRef = useRef();

  const handleFileChange = (e) => {
    const nextFile = e.target.files[0];
    setFile(inputName, nextFile);
  };

  const handleClearClick = () => {
    const inputNode = inputRef;
    console.log(inputNode);
    // inputNode.current.value = "";
    setFile(inputName, null);
  };

  useEffect(() => {
    // value 값이 없을 수도 있기 때문에 useEffect 를 종료해준다.
    if (!value) return;

    // objectURL 객체를 사용하여 미리보기 기능을 구현할 수 있다.
    // ObjectURL 을 만들면 웹 브라우저에 메모리를 할당한다.
    // 할당을 한 이후에는 해제를 해줘야한다.==> 메모리 낭비를 방지 해야 하기 때문이다.
    // 해제를 하는 시점에서useEffect에서 제공하는 사이드 이펙트를 정리하는 시점에 한다.
    // useEffect 에서 return을 해줄 때 정리하는 함수를 리턴해주면 사이드 이펙트를 제거할 수있다.
    const nextPreview = URL.createObjectURL(value);
    setPreview(nextPreview);

    return () => {
      setPreview();
      URL.revokeObjectURL(nextPreview);
    };
  }, [value]);
  // ReviewForm 렌더링=>FileInput 헨더링되면서 useEffect실행 useEffect내부 코드가 실행되고 사진변경
  // =>ReviewForm 재랜더링=>FileInput 도 재랜더링
  // =>이때에는 useEffect내부코드가 실행되는게 아니다

  // useEffect 실행시점
  // 1.최초 랜더링시
  // 2.디펜더시 리스트에 들어있는 값이 변경될때
  // 3.컴포넌트가 unmount 될 때

  // 디펜던시 리스트레 있는 값이 바뀌면 다시 함수를 실행하는데 이 전에 리액트는
  // 앞에서 리턴한 정리 함수(clean-up 함수)를 실행해서 사이드 이펙트를 정리한다.
  // 재렌더링=> useEffect함수 실행=>그 안에서 있는 return 함수 기억
  // =>사용자 파일이 변경되면 value값 변경으로 인한 useEffect함수 실행
  // =>앞에서 기억해뒀던 return함수 실행
  return (
    <div className="FileInput">
      <img className="FileInput-preview" src={preview || placeholderImg} />
      <input
        className="FileInput-hidden-overlay"
        type="file"
        accept="image/png, image/jpeg"
        onChange={handleFileChange}
        ref={inputRef}
      />
      {value && (
        <button className="FileInput-clear-button" onClick={handleClearClick}>
          <img src={resetImg} />
        </button>
      )}
    </div>
  );
}

export default FileInput;
