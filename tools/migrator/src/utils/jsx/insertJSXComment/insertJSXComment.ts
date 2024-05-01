import type { ASTPath, Comment } from 'jscodeshift';
import type core from 'jscodeshift';

export function insertJSXComment(
  j: core.JSCodeshift,
  element: ASTPath<any>,
  comment: string,
  position: 'before' | 'after' = 'before',
) {
  const commentContent = j.jsxEmptyExpression();
  const commentConcat = ` ${comment} `;
  commentContent.comments = [j.commentBlock(commentConcat, false, true)];

  const jsxComment = j.jsxExpressionContainer(commentContent);
  const lineBreak = j.jsxText('\n');

  if (position === 'before') {
    if (element.parentPath.value.type === 'ReturnStatement') {
      insertCommentBefore(j, element, commentConcat);
    } else {
      element.insertBefore(jsxComment);
      element.insertBefore(lineBreak);
    }
  }

  if (position === 'after') {
    element.insertAfter(lineBreak);
    element.insertAfter(jsxComment);
  }
}

export function insertCommentBefore(
  j: core.JSCodeshift,
  path: ASTPath<any>,
  comment: string,
) {
  path.value.comments = path.value.comments || [];

  const duplicateComment = path.value.comments.find(
    // @ts-ignore comment.value is a string
    (comment: Comment) => comment.value === comment,
  );

  // Avoiding duplicates of the same comment
  if (duplicateComment) return;

  path.value.comments.push(j.commentBlock(comment));
}

// https://github.com/facebook/jscodeshift/issues/354
