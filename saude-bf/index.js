import dotenv from "dotenv"
import puppeteer from "puppeteer-extra"
import StealthPlugin from "puppeteer-extra-plugin-stealth"


puppeteer.use(StealthPlugin())

dotenv.config()
const PASSWORD = process.env.PASSWORD
const CPF = process.env.USER_CPF

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

const testUrlPage = async (page) => {
    try {
        const url = await page.url()
        if (url != "https://bfa.saude.gov.br/mapaacompanhamento/acompanhamento/4251564")
            throw new Error("Página não carregada")
    } catch (error) {
        console.log(error.message)
        await delay(2000)
        await testUrlPage(page)
    }
}

    ; (async () => {
        const browser = await puppeteer.launch({ headless: false })
        const page = await browser.newPage()
        await page.goto("https://egestorab.saude.gov.br/paginas/acessoRestrito/perfilAcesso.xhtml")

        let button = await page.waitForSelector("div.form_card form#loginForm a")
        await button.click()

        const cpfInput = await page.waitForSelector("input#accountId")
        await cpfInput.type(CPF, { delay: 100 })
        await page.keyboard.press("Enter")

        const passwordInput = await page.waitForSelector("input#password")
        await passwordInput.type(PASSWORD, { delay: 150 })
        await page.keyboard.press("Enter")
    
        await testUrlPage(page)
        console.log("Página carregada")

        await page.screenshot({ path: "testresult.png", fullPage: true })

        // await page.close()
    })()
