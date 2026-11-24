import { categories, inventory, firstTen, timeframes } from './data.js';

let exporting = false;

function blankLines(Paragraph, count = 2) {
  return Array.from({ length: count }, () => new Paragraph({
    text: '________________________________________________________________________________',
    spacing: { after: 180 },
  }));
}

function makeDocx(api, title, children) {
  const { Document, Paragraph, TextRun, Footer, AlignmentType, PageNumber } = api;
  return new Document({
    creator: 'Personal Reset',
    title,
    styles: {
      default: { document: { run: { font: 'Calibri', size: 24, color: '24382D' }, paragraph: { spacing: { after: 180, line: 360 } } } },
      title: { run: { font: 'Cambria', size: 54, bold: true, color: '3F604B' }, paragraph: { spacing: { after: 300 } } },
      heading1: { run: { font: 'Cambria', size: 34, bold: true, color: '3F604B' }, paragraph: { spacing: { before: 200, after: 180 } } },
      heading2: { run: { font: 'Cambria', size: 28, bold: true, color: '3F604B' }, paragraph: { spacing: { before: 240, after: 120 } } },
    },
    sections: [{
      properties: { page: { margin: { top: 1080, right: 1080, bottom: 1080, left: 1080 } } },
      footers: { default: new Footer({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ children: ['Personal Reset · ', PageNumber.CURRENT], size: 20, color: '5C675E' })] })] }) },
      children,
    }],
  });
}

function questionsDocument(api) {
  const { Paragraph, TextRun, HeadingLevel } = api;
  const total = categories.reduce((sum, section) => sum + section[2].length, 0);
  const children = [
    new Paragraph({ text: 'Personal Reset', heading: HeadingLevel.TITLE }),
    new Paragraph({ text: total + ' Questions to Help You Figure Out What You Want in Life', heading: HeadingLevel.HEADING_1 }),
    new Paragraph({ text: categories.length + ' sections · ' + total + ' reflection prompts', spacing: { after: 320 } }),
    new Paragraph({ text: 'Answer honestly, at your own pace. You do not have to answer every question in one sitting.' }),
  ];
  let number = 0;
  categories.forEach(([title, description, questions], sectionIndex) => {
    children.push(new Paragraph({ text: 'Part ' + (sectionIndex + 1) + '. ' + title, heading: HeadingLevel.HEADING_1, pageBreakBefore: true, keepNext: true }));
    children.push(new Paragraph({ children: [new TextRun({ text: description, italics: true, color: '4D5D51' })], spacing: { after: 320 }, keepNext: true }));
    questions.forEach(question => {
      number++;
      children.push(new Paragraph({ children: [new TextRun({ text: number + '. ', bold: true }), new TextRun(question)], indent: { left: 540, hanging: 540 }, spacing: { after: 220, line: 360 }, keepLines: true }));
    });
  });
  return makeDocx(api, 'Personal Reset — ' + total + ' Questions', children);
}

function resetDocument(api) {
  const { Paragraph, TextRun, HeadingLevel } = api;
  const children = [
    new Paragraph({ text: 'Personal reset', heading: HeadingLevel.TITLE }),
    new Paragraph({ text: 'From reflection to action', heading: HeadingLevel.HEADING_1 }),
    new Paragraph({ text: 'You do not have to solve everything at once. Turn your answers into a practical plan, one small step at a time.', spacing: { after: 360 } }),
    new Paragraph({ text: 'Exercise 01 · Your five biggest opportunities', heading: HeadingLevel.HEADING_1 }),
    new Paragraph({ text: 'After answering the questions, identify five areas that deserve attention. Your list should reflect your own responses.' }),
  ];
  const suggestions = ['Financial', 'Physical', 'Professional', 'Personal', 'Relationships'];
  for (let i = 0; i < 5; i++) {
    children.push(new Paragraph({ text: 'Opportunity ' + (i + 1), heading: HeadingLevel.HEADING_2 }));
    children.push(new Paragraph({ children: [new TextRun({ text: 'Area: ', bold: true }), new TextRun(suggestions[i])], spacing: { after: 100 } }));
    children.push(new Paragraph({ children: [new TextRun({ text: 'What needs to change?', bold: true })], spacing: { after: 60 } }));
    children.push(...blankLines(Paragraph, 2));
  }
  children.push(new Paragraph({ text: 'Exercise 02 · Give change some time', heading: HeadingLevel.HEADING_1 }));
  children.push(new Paragraph({ text: 'These are starting points, not predetermined answers.' }));
  timeframes.forEach(([title, description, tasks]) => {
    children.push(new Paragraph({ text: title, heading: HeadingLevel.HEADING_2 }));
    children.push(new Paragraph({ children: [new TextRun({ text: description, italics: true })] }));
    tasks.forEach(task => children.push(new Paragraph({ children: [new TextRun({ text: '☐  ' + task })], indent: { left: 240 }, spacing: { after: 120 } })));
    children.push(new Paragraph({ text: 'My own next step:' }));
    children.push(...blankLines(Paragraph, 1));
  });
  children.push(new Paragraph({ text: 'Exercise 03 · Start with these ten', heading: HeadingLevel.HEADING_1 }));
  children.push(new Paragraph({ text: 'If answering all the questions feels like too much, start here. Get to the heart of the matter.', spacing: { after: 240 } }));
  firstTen.forEach((question, i) => {
    children.push(new Paragraph({ children: [new TextRun({ text: (i + 1) + '. ', bold: true }), new TextRun(question)], keepNext: true, spacing: { after: 80 } }));
    children.push(...blankLines(Paragraph, 2));
  });
  return makeDocx(api, 'Personal Reset', children);
}

function lifeDocument(api) {
  const { Paragraph, HeadingLevel } = api;
  const children = [
    new Paragraph({ text: 'The life I want', heading: HeadingLevel.TITLE }),
    new Paragraph({ text: 'My personal life inventory', heading: HeadingLevel.HEADING_1 }),
    new Paragraph({ text: 'Complete these sentences without overthinking them. In your own words, at your own pace.', spacing: { after: 360 } }),
  ];
  inventory.forEach((prompt, i) => {
    children.push(new Paragraph({ text: String(i + 1).padStart(2, '0') + '  ' + prompt, heading: HeadingLevel.HEADING_2, keepNext: true }));
    children.push(...blankLines(Paragraph, 3));
  });
  return makeDocx(api, 'The Life I Want', children);
}

function startDownload(url, filename) {
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.style.display = 'none';
  document.body.appendChild(link);
  link.click();
  link.remove();
}

export async function downloadQuestions(button, notify) {
  if (exporting) return;
  exporting = true;
  const originalLabel = button.textContent;
  button.disabled = true;
  button.textContent = 'Preparing Word documents…';
  button.setAttribute('aria-busy', 'true');
  const urls = [];
  try {
    const api = await import('https://esm.sh/docx@9.5.1?bundle');
    const docs = [
      ['personal-reset-questions.docx', questionsDocument(api)],
      ['personal-reset.docx', resetDocument(api)],
      ['the-life-i-want.docx', lifeDocument(api)],
    ];
    const blobs = await Promise.all(docs.map(([, doc]) => api.Packer.toBlob(doc)));
    docs.forEach(([filename], i) => {
      const url = URL.createObjectURL(blobs[i]);
      urls.push(url);
      startDownload(url, filename);
    });
    notify('Your 3 Word documents are downloading.');
  } catch (error) {
    console.error('Word export failed:', error);
    notify('Could not create the Word documents. Please check your connection and try again.');
  } finally {
    exporting = false;
    button.disabled = false;
    button.textContent = originalLabel;
    button.removeAttribute('aria-busy');
    setTimeout(() => urls.forEach(url => URL.revokeObjectURL(url)), 60000);
  }
}
