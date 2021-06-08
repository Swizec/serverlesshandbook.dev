// https://serverlesshandbook.dev/?product_id=72rJA8s-O_ZK0H7YXUOQug%3D%3D&product_permalink=qdNn&sale_id=KOlpO90OcOkb7-lTy3I-Cg%3D%3D

// This is from SRD
export const onClientEntry = () => {
  const query = new URLSearchParams(window.location.search)

  if (
    ["72Mdpm2jTgsapPjXuWpuXg==", "72rJA8s-O_ZK0H7YXUOQug=="].includes(
      query.get("product_id")
    ) &&
    ["qdNn", "NsUlA"].includes(query.get("product_permalink")) &&
    query.has("sale_id")
  ) {
    window.localStorage.setItem("unlock_handbook", JSON.stringify(true))
    window.localStorage.setItem("sale_id", JSON.stringify(query.get("sale_id")))
  }
}
