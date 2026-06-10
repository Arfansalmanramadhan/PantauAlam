import { useState, useEffect } from 'react';
import { Sidebar, useSidebar } from "../../components/SIdebar"
import Header from "../../components/Header"
import Main from "../../components/Main"

function GempaHome() {
    const [open, setOpen] = useSidebar();
    return (
        <>
            <div className="flex">
                <Sidebar open={open} setOpen={setOpen} />
                <Main open={open}>
                    <Header label="Gempa" />
                </Main>
            </div>
        </>
    )
}
export default GempaHome;