import { Container, ScopedCssBaseline } from "@mui/material";
import { ReactNode } from "react";

type MainLayoutProps = {
  children: ReactNode;
};

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <>
      <ScopedCssBaseline />
      <Container maxWidth="md">{children}</Container>
    </>
  );
};

export default MainLayout;
