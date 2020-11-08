import React, { useState, useRef, useEffect } from 'react';
import StyledDiv from './HashTagStyle';

// const colors = ['red', 'yellow', 'pink', 'green', 'blue'];

interface HashTagProps {
  hasTag: (hasTag: Array<string>) => void;
}

export default function HashTag({ hasTag }: HashTagProps) {
  const [tags, setTags] = useState([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const removeTag = (i: number) => {
    setTags(tags.filter((tag, index) => index !== i));
  };
  // let randomColor: string;
  const inputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const val = (e.target as HTMLInputElement).value;
    if (e.key === 'Enter' && val) {
      if (tags.find(tag => tag === `#${val}`) || val.length > 10) return;
      if (tags.length >= 5) return;
      if (tags[tags.length - 1] !== undefined) {
        if (tags[tags.length - 1][tags[tags.length - 1].length - 1] === val) {
          inputRef.current.value = null;
          return;
        }
      }

      setTags([...tags, `#${val}`]);
      inputRef.current.value = null;

      // randomColor = colors[Math.floor(Math.random() * colors.length)];
    }
    // else if (e.key === 'Backspace' && !val) {
    //   removeTag(tags.length - 1);
    // }
  };

  useEffect(() => {
    hasTag(tags);
  }, [hasTag, tags]);

  return (
    <StyledDiv>
      <ul className="hashTagList">
        <label htmlFor="hashTag">태그하기</label>
        {tags.map((tag, i) => (
          // <li key={tag} className="hashTagItem" style={{ background: randomColor }}>
          <li key={tag} className="hashTagItem">
            {tag}
            <button type="button" onClick={() => removeTag(i)}>
              x
            </button>
          </li>
        ))}
        <li className="inputTag">
          <input type="text" id="hashTag" onKeyDown={inputKeyDown} ref={inputRef} placeholder="#hashTag" />
        </li>
      </ul>
    </StyledDiv>
  );
}
