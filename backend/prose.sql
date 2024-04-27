\echo 'Delete and recreate prose db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE prose;
CREATE DATABASE prose;
\connect prose

\i prose-schema.sql

\echo 'Delete and recreate prose_test db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE prose_test;
CREATE DATABASE prose_test;
\connect prose_test

\i prose-schema.sql