import {React, useState, UseEffect} from 'react';
import { CuacaSaatIni, CuacaBesok, CuacaLusa } from "./CuacaSaatIni"
import {Sidebar, useSidebar}  from "../../components/Sidebar"
import Header from "../../components/Header"
import Main from "../../components/Main"
// import Tab from "../../components/Tab"

function Cuaca() {
    const [open, setOpen] = useSidebar()
    return (
        <div className="flex">
            <Sidebar open={open} setOpen={setOpen} />
            <Main open={open}>
                <Header label="Cuaca" />
            </Main>

        </div>
    )
}
export default Cuaca;