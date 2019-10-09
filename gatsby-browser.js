export { wrapPageElement } from './src'


// https://serverlesshandbook.dev/?product_id=72rJA8s-O_ZK0H7YXUOQug%3D%3D&product_permalink=qdNn&sale_id=KOlpO90OcOkb7-lTy3I-Cg%3D%3D

export const onClientEntry = () => {
    const query = new URLSearchParams(window.location.search)

    if (
        query.get("product_id") === "72rJA8s-O_ZK0H7YXUOQug==" &&
        query.get("product_permalink") === "qdNn" &&
        query.has("sale_id")
    ) {
        window.localStorage.setItem("unlock_handbook", true)
        window.localStorage.setItem("sale_id", query.get("sale_id"))
    }
}
