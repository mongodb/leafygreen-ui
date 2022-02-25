import React, { useState } from 'react';
import Code from '.';
import { Language, LanguageOption } from './types';

export function PythonLogo({ className }: { className?: string }) {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.63839 0.187825C9.41602 0.0682998 10.3164 0 11.2578 0C12.1991 0 13.1814 0.0512249 14.0818 0.187825C15.5757 0.392724 16.824 1.31477 16.824 2.56124V6.91536C16.824 8.19598 15.6166 9.23755 14.0818 9.23755H8.59746C6.7557 9.23755 5.17998 10.5865 5.17998 12.0891V14.1893H3.29729C1.72157 14.1893 0.780226 13.216 0.391411 11.8671C-0.140652 10.0401 -0.120188 8.94728 0.391411 7.20563C0.841618 5.68596 2.23317 4.88344 3.82936 4.88344H5.89622H11.3806V4.30289H5.89622V2.56124C5.89622 1.24647 6.32596 0.529324 8.63839 0.187825ZM9.31401 2.27082C9.31401 1.79272 8.8638 1.39999 8.29081 1.39999C7.71782 1.39999 7.26762 1.79272 7.26762 2.27082C7.26762 2.74892 7.71782 3.14164 8.29081 3.14164C8.84334 3.14164 9.31401 2.74892 9.31401 2.27082Z"
        fill="url(#paint0_linear)"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M17.54 6.91565V4.88373H19.6069C21.203 4.88373 21.9602 5.87408 22.349 7.20592C22.9016 9.05002 22.922 10.4331 22.349 11.8674C21.7965 13.2675 21.203 14.1896 19.6069 14.1896H16.8647H11.3803V14.7701H16.8647V16.4947C16.8647 17.8095 15.5141 18.4754 14.1225 18.8169C12.0352 19.3121 10.3776 19.2438 8.63817 18.8169C7.18523 18.4583 5.896 17.7412 5.896 16.4947V12.1406C5.896 10.8941 7.1443 9.81839 8.63817 9.81839H14.102C15.9438 9.81839 17.54 8.48655 17.54 6.91565ZM15.4946 16.8017C15.4946 16.3236 15.0444 15.9309 14.4714 15.9309C13.8984 15.9309 13.4277 16.3236 13.4482 16.8017C13.4482 17.2798 13.8984 17.6725 14.4714 17.6725C15.0239 17.6725 15.4946 17.2798 15.4946 16.8017Z"
        fill="url(#paint1_linear)"
      />
      <path
        opacity="0.4438"
        d="M18.7889 21.8047C18.7889 22.4536 15.4942 23 11.4423 23C7.39046 23 4.09576 22.4707 4.09576 21.8047C4.09576 21.1559 7.39046 20.6095 11.4423 20.6095C15.4942 20.6095 18.7889 21.1388 18.7889 21.8047Z"
        fill="url(#paint2_radial)"
      />
      <defs>
        <linearGradient
          id="paint0_linear"
          x1="-5.93176"
          y1="5.83768"
          x2="4.77152"
          y2="16.7453"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#5A9FD4" />
          <stop offset="1" stopColor="#306998" />
        </linearGradient>
        <linearGradient
          id="paint1_linear"
          x1="20.0177"
          y1="13.2526"
          x2="16.4716"
          y2="7.34899"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FFD43B" />
          <stop offset="1" stopColor="#FFE873" />
        </linearGradient>
        <radialGradient
          id="paint2_radial"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(11.4433 21.7848) rotate(-90) scale(1.18943 36.4954)"
        >
          <stop stopColor="#B8B8B8" stopOpacity="0.498" />
          <stop offset="1" stopColor="#7F7F7F" stopOpacity="0.01" />
        </radialGradient>
      </defs>
    </svg>
  );
}

function JavaScriptLogo({ className }: { className?: string }) {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path d="M24 0H0V24H24V0Z" fill="#F7DF1E" />
      <path
        d="M16.1219 18.7505C16.6057 19.539 17.2343 20.1219 18.3467 20.1219C19.28 20.1219 19.8781 19.6533 19.8781 19.0095C19.8781 18.2362 19.2648 17.9619 18.2362 17.5124L17.6724 17.2686C16.0457 16.5752 14.9638 15.7066 14.9638 13.8705C14.9638 12.179 16.2514 10.8914 18.2667 10.8914C19.6991 10.8914 20.7315 11.3905 21.4743 12.6971L19.7181 13.8247C19.3334 13.1314 18.9143 12.8571 18.2667 12.8571C17.6076 12.8571 17.1886 13.2762 17.1886 13.8247C17.1886 14.5028 17.6076 14.7771 18.5753 15.1962L19.1391 15.4362C21.0553 16.259 22.1372 17.0971 22.1372 18.979C22.1372 21.0095 20.541 22.1219 18.4 22.1219C16.3048 22.1219 14.9524 21.1238 14.2895 19.8171L16.1219 18.7505ZM8.1562 18.9447C8.51049 19.5733 8.8343 20.1067 9.60763 20.1067C10.3505 20.1067 10.8153 19.8171 10.8153 18.6895V11.0209H13.0705V18.72C13.0705 21.0552 11.7029 22.1181 9.70287 22.1181C7.89715 22.1181 6.84953 21.1848 6.32001 20.0571L8.1562 18.9447Z"
        fill="black"
      />
    </svg>
  );
}

const languageOptions = [
  {
    displayName: 'JavaScript',
    language: Language.JavaScript,
    image: <JavaScriptLogo />,
  },
  {
    displayName: 'Python',
    language: Language.Python,
    image: <PythonLogo />,
  },
];

const jsSnippet = `

function greeting(entity) {
  return \`Hello, \${entity}!\`;
}

console.log(greeting('World'));

`;

const pythonSnippet = `

def greeting(entity):
    return "Hello {}".format(entity)

print (greeting("World"))

`;

const snippetMap = {
  [Language.JavaScript]: jsSnippet,
  [Language.Python]: pythonSnippet,
};

function LanguageSwitcher({
  darkMode,
  onChange,
  customActionButtons = [],
  showCustomActionButtons = false,
}: {
  darkMode?: boolean;
  onChange?: Function;
  customActionButtons?: Array<React.ReactNode>;
  showCustomActionButtons?: boolean;
}) {
  const [language, setLanguage] = useState<LanguageOption>(languageOptions[0]);

  const handleChange = (languageObject: LanguageOption) => {
    setLanguage(languageObject);
    onChange?.(languageObject);
  };

  const languageIndex = language.language;

  return (
    <Code
      language={language?.displayName}
      lineNumberStart={1}
      onChange={handleChange}
      languageOptions={languageOptions}
      darkMode={darkMode}
      customActionButtons={customActionButtons}
      showCustomActionButtons={showCustomActionButtons}
    >
      {snippetMap[languageIndex as 'javascript' | 'python']}
    </Code>
  );
}

export default LanguageSwitcher;
