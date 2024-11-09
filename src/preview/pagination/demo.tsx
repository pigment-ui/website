import { useState } from "react";

const code = `
import { Pagination } from "pigment-ui";
import { useState } from "react";

function PaginationDemo() {
  const [page, setPage] = useState(1);
  
  return (
    <Pagination total={10} page={page} onChange={setPage} />
  );
}
`;

export const demo = { code, scope: { useState } };
