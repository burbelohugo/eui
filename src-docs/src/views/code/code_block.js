import React from 'react';

import { EuiCodeBlock, EuiSpacer } from '../../../../src/components';

const htmlCode = `<!--I'm an example of HTML-->
<div>
  <h1>Title sdfjdsafaldfjkassjakfdksa fsjd kfjaksdlj flksjdfklsjadklfjakjfklajsdklfjklsdjfklajsdklfjaksdjfkljskf sds fsdfds Title sdfjdsafaldfjkassjakfdksa fsjd kfjaksdlj flksjdfklsjadklfjakjfklajsdklfjklsdjfklajsdklfjaksdjfkljskf sds fsdfds Title sdfjdsafaldfjkassjakfdksa fsjd kfjaksdlj flksjdfklsjadklfjakjfklajsdklfjklsdjfklajsdklfjaksdjfkljskf sds fsdfds</h1>
</div>
`;

const jsCode = require('!!raw-loader!./code_block');

export default () => (
  <div>
    <EuiCodeBlock language="html" noLineWrap={false}>
      {htmlCode}
    </EuiCodeBlock>

    <EuiSpacer />

    <EuiCodeBlock
      language="js"
      fontSize="m"
      paddingSize="m"
      color="dark"
      overflowHeight={300}
      isCopyable>
      {jsCode}
    </EuiCodeBlock>

    <EuiSpacer />
  </div>
);
