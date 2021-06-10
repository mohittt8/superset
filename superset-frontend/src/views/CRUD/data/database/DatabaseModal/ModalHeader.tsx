/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import React from 'react';
import {
  EditHeaderTitle,
  EditHeaderSubtitle,
  CreateHeaderTitle,
  CreateHeaderSubtitle,
  StyledFormHeader,
} from './styles';
import { DatabaseForm, DatabaseObject } from '../types';

export const DOCUMENTATION_LINK =
  'https://superset.apache.org/docs/databases/installing-database-drivers';

const irregularDocumentationLinks = {
  postgresql: 'https://superset.apache.org/docs/databases/postgres',
  mssql: 'https://superset.apache.org/docs/databases/sql-server',
};

const documentationLink = (engine: string | undefined) => {
  if (!engine) return null;
  if (!irregularDocumentationLinks[engine]) {
    return `https://superset.apache.org/docs/databases/${engine}`;
  }
  return irregularDocumentationLinks[engine];
};
const ModalHeader = ({
  isLoading,
  isEditMode,
  useSqlAlchemyForm,
  hasConnectedDb,
  db,
  dbName,
  dbModel,
}: {
  isLoading: boolean;
  isEditMode: boolean;
  useSqlAlchemyForm: boolean;
  hasConnectedDb: boolean;
  db: Partial<DatabaseObject> | null;
  dbName: string;
  dbModel: DatabaseForm;
}) => {
  const isEditHeader = (
    <>
      <EditHeaderTitle>{db?.backend}</EditHeaderTitle>
      <EditHeaderSubtitle>{dbName}</EditHeaderSubtitle>
    </>
  );
  const useSqlAlchemyFormHeader = (
    <>
      <p className="helper"> Step 2 of 2 </p>
      <CreateHeaderTitle>Enter Primary Credentials</CreateHeaderTitle>
      <CreateHeaderSubtitle>
        Need help? Learn how to connect your database{' '}
        <a href={DOCUMENTATION_LINK} target="_blank" rel="noopener noreferrer">
          here
        </a>
        .
      </CreateHeaderSubtitle>
    </>
  );
  const hasConnectedDbHeader = (
    <StyledFormHeader>
      <p className="helper"> Step 3 of 3 </p>
      <h4>
        Your database was successfully connected! Here are some optional
        settings for your database
      </h4>
      <p className="helper">
        Need help? Learn more about{' '}
        <a
          href={documentationLink(db?.engine)}
          target="_blank"
          rel="noopener noreferrer"
        >
          connecting to {dbModel.name}
        </a>
      </p>
    </StyledFormHeader>
  );
  const hasDbHeader = (
    <StyledFormHeader>
      <p className="helper"> Step 2 of 3 </p>
      <h4>Enter the required {dbModel.name} credentials</h4>
      <p className="helper">
        Need help? Learn more about connecting to {dbModel.name}.
      </p>
    </StyledFormHeader>
  );
  const noDbHeader = (
    <StyledFormHeader>
      <div className="select-db">
        <p className="helper"> Step 1 of 3 </p>
        <h4>Select a database to connect</h4>
      </div>
    </StyledFormHeader>
  );

  if (isLoading) return <></>;
  if (isEditMode) {
    return isEditHeader;
  }
  if (useSqlAlchemyForm) {
    return useSqlAlchemyFormHeader;
  }
  if (hasConnectedDb) {
    return hasConnectedDbHeader;
  }
  if (db) {
    return hasDbHeader;
  }
  return noDbHeader;
};

export default ModalHeader;
