import { SlideRevealShareButtonDoc } from "./SlideRevealShareButtonDoc";

export const buttonRegistry = {
  [SlideRevealShareButtonDoc.slug]: SlideRevealShareButtonDoc,
};

//TODO: auto-import all docs in the folder
//
// const context = require.context("./", false, /\.ts$/);
//
// export const buttonRegistry = {};
//
// context.keys().forEach((key) => {
//   const module = context(key);
//   const doc = Object.values(module)[0];
//   buttonRegistry[doc.slug] = doc;
// });
