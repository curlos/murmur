import React from 'react';

/**
 * @description - Returns an "onKeyDown" handler that runs the given click handler when "Enter" or "Space" is pressed. Used for elements (like tweet images) that act as buttons but can't be swapped for a real <button> without breaking their layout.
 * @param {Function} handler - The same function used for the element's "onClick".
 * @returns {Function}
 */
export const onEnterOrSpace = (handler: (e: React.KeyboardEvent<any>) => void) => (e: React.KeyboardEvent<any>) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    handler(e);
  }
};
