//regular expression that matches a url
const urlRegExp =
  /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/i;

//default defaultAnchorState
export const defaultAnchorState = {
  removeRange: null,
  insertRange: null,
  linkText: null,
  anchorTextEqualToLink: null,
  removeFormat: null,
  placeSelectionRight: null,
};

export const ModifyAnchorText = (editorContent, quillText) => {
  //variable declaration
  const ops = editorContent.ops;

  let removeIndex = null;
  let removeLength = null;
  let insertIndex = null;
  let insertLength = null;

  let removeFormat = false;
  let placeSelectionRight = false;
  let anchorTextEqualToLink = false;
  let breakLoop = false;

  let anchorText = "";
  let linkText = "";

  for (const [i, delta] of ops.entries()) {
    //break loop
    if (breakLoop) {
      break;
    }
    //check if delta has link attribute
    if (delta?.attributes?.link) {
      //get linkText and anchorText from delta
      linkText = delta.attributes.link;
      anchorText = delta.insert;

      //find the index of the anchorText in the quillText
      removeIndex = quillText.indexOf(anchorText);
      //if anchorText is in quillText set removeLength to the length of the anchorText
      removeIndex !== -1 && (removeLength = anchorText.length);

      //check if anchorText is equal to linkText
      anchorTextEqualToLink = anchorText === linkText;

      const left = ops[i - 1]?.insert ? ops[i - 1].insert.length : null;

      //checking previous deltas insert
      if (
        left &&
        ops[i - 1]?.insert?.slice(left - 1) !== " " &&
        ops[i - 1]?.insert?.slice(left - 1) !== "\n" &&
        !ops[i - 1]?.attributes?.link &&
        !breakLoop
      ) {
        insertIndex = removeIndex - 1;
        //add character added from the left
        const pre = ops[i - 1]?.insert?.slice(left - 1);
        const compare = pre + linkText;

        if (anchorTextEqualToLink) {
          //check if added character is still a valid link
          if (urlRegExp.test(compare)) {
            pre.concat(linkText);
            breakLoop = true;
          }
        } else {
          insertLength = removeLength + 1;
          breakLoop = true;
        }
      }

      //checking next deltas insert
      if (
        ops[i + 1]?.insert[0] !== " " &&
        ops[i + 1]?.insert[0] &&
        ops[i + 1]?.insert[0] !== "\n" &&
        !ops[i + 1]?.attributes?.link &&
        !breakLoop
      ) {
        insertLength = removeLength + 1;
        //add character added from the right
        const append = ops[i + 1]?.insert[0];
        const compare = linkText + append;
        if (anchorTextEqualToLink) {
          //check if added character is still a valid link
          if (urlRegExp.test(compare)) {
            linkText.concat(append);
            placeSelectionRight = true;
            breakLoop = true;
          }
        } else {
          breakLoop = true;
        }
      }

      if (!anchorTextEqualToLink && !breakLoop) {
        //boolean if insert is from start/left
        const insertFromStart =
          anchorText === linkText.slice(0, -1) && !breakLoop;
        //boolean if insert is from end/right
        const insertFromEnd =
          anchorText === linkText.substring(1) && !breakLoop;

        //set linkText
        linkText = insertFromStart
          ? linkText.slice(0, -1)
          : insertFromEnd
          ? linkText.substring(1)
          : linkText;

        removeFormat = insertFromStart || insertFromEnd;
        breakLoop = insertFromStart || insertFromEnd;
      }

      //replace anchorText instance in quillText with | to avoid duplicate conflicts
      removeIndex !== -1 &&
        !breakLoop &&
        (quillText = quillText.replace(anchorText, "|".repeat(removeLength)));
    }
  }

  !insertIndex && (insertIndex = removeIndex);
  !insertLength && (insertLength = removeLength);

  //set removeRange and insertRange
  const removeRange = { index: removeIndex, length: removeLength };
  const insertRange = { index: insertIndex, length: insertLength };

  const update = insertIndex === removeIndex && insertLength === removeLength;

  return {
    removeRange,
    insertRange,
    linkText: update ? null : linkText,
    anchorTextEqualToLink: update ? null : !anchorTextEqualToLink,
    removeFormat: update ? removeFormat : null,
    placeSelectionRight,
  };
};

export const ConvertLinks = (editorContent, quillText) => {
  //declaring variables
  const ops = editorContent.ops;

  let startLinkIndex = null;
  let endLinkIndex = null;
  let linkTextIndex = null;
  let linkText = null;

  for (const delta of ops) {
    //Check if delta does not have a link attribute but has a insert property
    if (!delta?.attributes?.link && delta.insert) {
      const deltaText = delta?.insert;

      //split text into an array by removing any empty strings
      const textArray = deltaText.split(/(\s+)/).filter((t) => t.length > 0);
      //find the index of the first link in the textArray
      linkTextIndex = textArray.findIndex((t) => urlRegExp.test(t));
      //if linkTextIndex is not -1 set linkText to the link in the textArray
      linkTextIndex !== -1 && (linkText = textArray[linkTextIndex]);

      //setting startLinkIndex and endLinkIndex if linkText is valid
      if (linkText) {
        startLinkIndex = quillText.indexOf(linkText);
        if (startLinkIndex !== -1) {
          endLinkIndex = linkText.length;
          break;
        }
      }
    }
    //check if delta has a link attribute and a insert property
    if (delta?.attributes?.link && delta.insert) {
      const insert = delta.insert;
      const index = quillText.indexOf(insert);
      const length = insert.length;
      //replace anchorText instance in quillText with | to avoid duplicate conflicts
      index !== -1 &&
        (quillText = quillText.replace(insert, "|".repeat(length)));
    }
  }

  return { link: linkText, startLinkIndex, endLinkIndex };
};