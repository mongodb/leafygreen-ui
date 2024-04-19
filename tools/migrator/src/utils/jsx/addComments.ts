import type { ASTPath } from 'jscodeshift';
import type core from 'jscodeshift';

//FIXME: debug, not fully working
export function insertJSXComment(
  j: core.JSCodeshift,
  element: ASTPath<any>,
  comment: string,
  position: 'before' | 'after' = 'before',
) {
  const commentContent = j.jsxEmptyExpression();
  commentContent.comments = [j.commentBlock(` ${comment} `, false, true)];

  const jsxComment = j.jsxExpressionContainer(commentContent);
  const lineBreak = j.jsxText('\n');

  if (position === 'before') {
    if (element.parentPath.value.type === 'ReturnStatement') {
      insertCommentBefore(j, element, comment);
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
  const content = ` ${comment} `;

  path.value.comments = path.value.comments || [];

  const exists = path.value.comments.find(
    // @ts-ignore
    comment => comment.value === content,
  );

  // Avoiding duplicates of the same comment
  if (exists) return;

  path.value.comments.push(j.commentBlock(content));
}

// https://github.com/facebook/jscodeshift/issues/354
