/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/triple-slash-reference */

/// <reference path="components/project-input.ts" />
/// <reference path="components/project-list.ts" />

namespace App {
  new ProjectInput();
  new ProjectList('active');
  new ProjectList('finished');
}
