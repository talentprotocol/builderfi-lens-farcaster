import "dotenv/config"

export const main = async () => {
    console.log("Start.")
}

main().then(() => {
    process.exit(0)
})