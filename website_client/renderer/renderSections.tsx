// renderer/renderSections.tsx

import { componentMap } from "./componentMap";
import { mapSectionData } from "./dataMapper";
import { Section } from "@/types/page";

type Props = {
  sections: Section[];
};

export function renderSections({ sections }: Props) {
  if (!sections || sections.length === 0) {
    return null;
  }

  return (
    <>
      {sections.map((section, index) => {
        const Component = componentMap[section.type];

        // Safety check: if component is not registered
        if (!Component) {
          console.warn(`Component not found: ${section.type}`);
          return null;
        }

        // Map backend data format to component props format
        const mappedProps = mapSectionData(section.type, section.content || {});

        return <Component key={section.id || index} {...mappedProps} />;
      })}
    </>
  );
}
