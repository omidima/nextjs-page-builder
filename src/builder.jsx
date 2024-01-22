import 'grapesjs/dist/css/grapes.min.css';
import grapesjs from 'grapesjs';
import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from "react-bootstrap"
import { Button, TextField } from "@radix-ui/themes"

import gjspresetwebpage from 'grapesjs-preset-webpage';
import gjsblockbasic from 'grapesjs-blocks-basic'
import { getCookie } from "./cookie_helper"
import { ACCESS_TOKEN, API_URL } from './main';


async function createPageContent(title, desc, link, content, style) {
    const response = await fetch(`${API_URL}/page-builder`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${getCookie(ACCESS_TOKEN)}`
        },
        body: JSON.stringify({
            title: title,
            desc: desc,
            link: link,
            content: content,
            style: style
        })
    })

    return response
}

export default function AppBuilder() {
    const [editor, setState] = useState()

    useEffect(() => {
        const a = grapesjs.init({
            container: '#gjs',
            plugins: [gjsblockbasic,
                gjspresetwebpage],
            fromElement: false,
            height: '90vh',
            width: 'auto',
            baseCss: "* {font-family: 'IRANYekanMobile';} div[data-gjs-type='wrapper'] {background: #ffffffee; direction:rtl;}",
            jsInHtml: true,
            devicePreviewMode: true,
            showDevices: true,
            storageManager: true,
        })
        
        setState(a)
    }, [])


    function submitForm(e) {
        e.preventDefault()
        const title = e.currentTarget.querySelector("input[id='title']").value
        const desc = e.currentTarget.querySelector("input[id='desc']").value
        const link = e.currentTarget.querySelector("input[id='link']").value

        createPageContent(title, desc, link, editor.getHtml(), editor.getCss()).then(r => {
            window.close()
        })
    }

    return <>
        <Container className='p-5' fluid style={{
            background: "#463a3c"
        }}>
            <Row>
                <Col md={10}>
                    <div id="gjs">
                        <h1>Hello World Component!</h1>
                    </div>
                </Col>
                <Col md={2}>
                    <div className='p-2 rounded bg-white'>
                        <form onSubmit={submitForm}>
                            <div className='mb-2'>
                                <label htmlFor='title'>نام صفحه</label>
                                <TextField.Input id={"title"} />
                            </div>
                            <div className='mb-2'>
                                <label htmlFor='desc'>توضیحات صفحه</label>
                                <TextField.Input id={"desc"} />
                            </div>
                            <div className='mb-5'>
                                <label htmlFor='link'>لینک صفحه</label>
                                <TextField.Input id={"link"} />
                            </div>

                            <div className='text-center d-block'>
                                <Button variant='solid' className='mb-3'>ذخیره </Button>
                                <br />
                                <Button variant='soft' color='red' onClick={() => {
                                    window.close()
                                }}>برگشت </Button>
                            </div>
                        </form>
                    </div>
                </Col>
            </Row>
        </Container>

    </>
}