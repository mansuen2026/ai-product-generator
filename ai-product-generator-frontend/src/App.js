import React, { useState } from "react";

function App() {
  const [product, setProduct] = useState("");
  const [language, setLanguage] = useState("en");
  const [description, setDescription] = useState("");

  const generateDescription = async () => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/generate?product=${encodeURIComponent(product)}&language=${language}`
      );
      const data = await response.json();
      if (data.error) {
        setDescription(`Error: ${data.error}`);
      } else {
        setDescription(data.description);
      }
    } catch (error) {
      setDescription(`Error: ${error.message}`);
    }
  };

  return (
    <div style={{ margin: "50px" }}>
      <h1>AI 商品描述生成器</h1>
      <input
        type="text"
        placeholder="輸入商品名稱"
        value={product}
        onChange={(e) => setProduct(e.target.value)}
      />
      <select value={language} onChange={(e) => setLanguage(e.target.value)}>
        <option value="en">English</option>
        <option value="zh">中文</option>
        <option value="es">Español</option>
        <option value="vi">Tiếng Việt</option>
        <option value="th">ภาษาไทย</option>
        <option value="pt">Português</option>
      </select>
      <button onClick={generateDescription}>生成描述</button>
      <p><strong>結果：</strong> {description}</p>
    </div>
  );
}

export default App;
