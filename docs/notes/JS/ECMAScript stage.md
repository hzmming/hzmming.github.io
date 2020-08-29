---
title: ECMAScript stage.md
date: 2019-10-23
tags:
  - JS
categories:
  - JS
---

https://tc39.es/process-document/



|      | Stage       | Purpose                                                      | Entrance Criteria                                            | Acceptance Signifies                                         | Spec Quality                                                 | Post-Acceptance Changes Expected                             | Implementation Types Expected* |
| ---- | ----------- | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------ |
| 0    | Strawperson | Allow input into the specification                           | None                                                         | N/A                                                          | N/A                                                          | N/A                                                          | N/A                            |
| 1    | Proposal    | Make the case for the additionDescribe the shape of a solutionIdentify potential challenges | Identified “champion” who will advance the additionProse outlining the problem or need and the general shape of a solutionIllustrative examples of usageHigh-level APIDiscussion of key algorithms, abstractions and semanticsIdentification of potential “cross-cutting” concerns and implementation challenges/complexity | The committee expects to devote time to examining the problem space, solutions and cross-cutting concerns | None                                                         | Major                                                        | Polyfills / demos              |
| 2    | Draft       | Precisely describe the syntax and semantics using formal spec language | AboveInitial spec text                                       | The committee expects the feature to be developed and eventually included in the standard | Draft: all *major* semantics, syntax and API are covered, but TODOs, placeholders and editorial issues are expected | Incremental                                                  | Experimental                   |
| 3    | Candidate   | Indicate that further refinement will require feedback from implementations and users | AboveComplete spec textDesignated reviewers have signed off on the current spec textAll ECMAScript editors have signed off on the current spec text | The solution is complete and no further work is possible without implementation experience, significant usage and external feedback. | Complete: all semantics, syntax and API are completed described | Limited: only those deemed critical based on implementation experience | Spec compliant                 |
| 4    | Finished    | Indicate that the addition is ready for inclusion in the formal ECMAScript standard | Above[Test262](https://github.com/tc39/test262) acceptance tests have been written for mainline usage scenarios, and mergedTwo compatible implementations which pass the acceptance testsSignificant in-the-field experience with shipping implementations, such as that provided by two independent VMsA pull request has been sent to [tc39/ecma262](https://github.com/tc39/ecma262) with the integrated spec textAll ECMAScript editors have signed off on the pull request | The addition will be included in the soonest practical standard revision | Final: All changes as a result of implementation experience are integrated | None                                                         | Shipping                       |