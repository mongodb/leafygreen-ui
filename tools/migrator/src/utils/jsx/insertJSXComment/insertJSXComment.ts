import type { ASTPath, Comment } from 'jscodeshift';
import type core from 'jscodeshift';

/**
 * Util that inserts comments before or after a line of code
 * */
export function insertJSXComment(
  j: core.JSCodeshift,
  element: ASTPath<any>,
  comment: string,
  position: 'before' | 'after' = 'before',
) {
  // https://github.com/facebook/jscodeshift/issues/354
  const commentContent = j.jsxEmptyExpression();
  const commentConcat = ` ${comment} `;
  commentContent.comments = [j.commentBlock(commentConcat, false, true)];
  const jsxComment = j.jsxExpressionContainer(commentContent);
  const lineBreak = j.jsxText('\n');

  if (position === 'before') {
    // If the component is the first direct child after a return statement, this means it is not nested in another component so comments should look like /* comment */, without the brackets
    if (element.parentPath.value.type === 'ReturnStatement') {
      insertCommentBefore(j, element, commentConcat);
    } else {
      // The element is nested inside another component so comments should look like {/* comment */}, with the brackets
      element.insertBefore(jsxComment);
      element.insertBefore(lineBreak);
    }
  }

  if (position === 'after') {
    element.insertAfter(lineBreak);
    element.insertAfter(jsxComment);
  }
}

/**
 * Util that inserts a comment into an array of comments.
 *
 * Components that are not nested inside another component can have an array of comments.
 */
export function insertCommentBefore(
  j: core.JSCodeshift,
  path: ASTPath<any>,
  commentString: string,
) {
  path.value.comments = path.value.comments || [];

  const duplicateComment = path.value.comments.find(
    (comment: Comment) => comment.value === commentString,
  );

  // Avoiding duplicates of the same comment
  if (duplicateComment) return;

  path.value.comments.push(j.commentBlock(commentString));
}
