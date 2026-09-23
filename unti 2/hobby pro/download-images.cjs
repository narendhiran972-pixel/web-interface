const https = require("https");
const fs = require("fs");

const files = [
  {
    url: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&auto=format&fit=crop&q=80",
    name: "music.jpg",
  },
  {
    url: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600&auto=format&fit=crop&q=80",
    name: "Reading.jpg",
  },
  {
    url: "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=600&auto=format&fit=crop&q=80",
    name: "Photography.jpg",
  },
  {
    url: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=600&auto=format&fit=crop&q=80",
    name: "Travelling.jpg",
  },
  {
    url: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&auto=format&fit=crop&q=80",
    name: "cooking.jpg",
  },
];

function download(url, dest, cb) {
  const file = fs.createWriteStream(dest);
  https
    .get(url, (response) => {
      if (response.statusCode === 301 || response.statusCode === 302) {
        download(response.headers.location, dest, cb);
        return;
      }
      response.pipe(file);
      file.on("finish", () => {
        file.close(cb);
        console.log("Downloaded: " + dest);
      });
    })
    .on("error", (err) => {
      fs.unlink(dest, () => {});
      console.error("Error: " + err.message);
    });
}

files.forEach((f) => {
  download(f.url, "src/assets/" + f.name, () => {});
});
