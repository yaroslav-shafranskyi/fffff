import { FC, useCallback, MouseEvent, ChangeEvent } from "react";
import { TablePagination } from "@mui/material";

import { IPaginationProps } from "./types";

export const Pagination: FC<IPaginationProps> = (props) => {
    const { total, iterator, onChange } = props;

    const { page, rowsPerPage } = iterator;

    const handleChangePage = useCallback((
        _event: MouseEvent<HTMLButtonElement> | null,
        newPage: number,
      ) => {
        onChange({ ...iterator, page: newPage });
      }, [iterator, onChange]);
    
      const handleChangeRowsPerPage = useCallback((
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
      ) => {
        onChange({ rowsPerPage: parseInt(event.target.value, 10), page: 0 });
      }, [onChange]);

    return (
        <TablePagination
          component="div"
          count={total}
          page={!total || total <= 0 ? 0 : page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      );
    
};
