import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { TestimonialsFragment } from './components/TestimonialsFragment';

export function render(props: any = {}): string {
  return ReactDOMServer.renderToString(React.createElement(TestimonialsFragment, props));
}

export { TestimonialsFragment };
export default TestimonialsFragment;
