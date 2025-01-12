// import { useState } from "react";
import { AppShell, Group, Image } from "@mantine/core";

import "./App.css";

import logo from "./assets/stackline_logo.svg";
import DataPage from "./components/DataPages/DataPage";

function App() {
  // const pinned = useHeadroom({ fixedAt: 120 });

  return (
    <AppShell header={{ height: 60 }} padding="md">
      <AppShell.Header bg="#052849" p="md">
        <Group h="100%" px="md">
          <Image src={logo} fit="contain" h={30} />
        </Group>
      </AppShell.Header>

      <AppShell.Main>
        <DataPage />
      </AppShell.Main>
    </AppShell>
  );
}

export default App;
