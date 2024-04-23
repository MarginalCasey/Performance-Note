"use client";

import { useEffect, useState } from "react";

interface Heading {
  id: string;
  text: string;
  level: number;
}

const TableOfContent = () => {
  const [headings, setHeadings] = useState<Heading[]>([]);
  useEffect(() => {
    const elements = Array.from(document.querySelectorAll("h3, h4, h5, h6"))
      .filter((element) => element.id)
      .map((element) => ({
        id: element.id,
        text: element.textContent ?? "",
        level: Number(element.tagName.substring(1)),
      }));
    setHeadings(elements);
  }, []);

  return (
    <nav className="hidden 3xl:block fixed top-5 right-5 w-52 border-l border-blue-gray-100">
      <ul className="m-0">
        {headings.map((heading) => (
          <li
            className="list-none text-xs my-2"
            key={heading.id}
            style={{ marginLeft: `${heading.level - 2}em` }}
          >
            <a className="hover:underline" href={`#${heading.id}`}>
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default TableOfContent;
