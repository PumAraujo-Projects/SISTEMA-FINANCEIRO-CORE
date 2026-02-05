import app from "./vercel";

const PORT = process.env.PORT || 4003;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
