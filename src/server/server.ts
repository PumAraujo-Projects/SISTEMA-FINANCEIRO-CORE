import app from "../app/app";

const PORT = process.env.PORT || 9999;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
