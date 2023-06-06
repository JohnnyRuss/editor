const fs = require("fs");

const generateID = () => Math.random().toString(32).substring(2);
const generateRandomNums = () => Math.floor(Math.random() * 500 + 1);
const generateRandomDate = (start = new Date(2012, 0, 1), end = new Date()) =>
  new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));

// JSON Placeholders
async function writePosts() {
  try {
    function generateReaction() {
      return {
        like: {
          id: generateID(),
          fig: "👍",
          title: "like",
          count: generateRandomNums(),
        },
        wow: {
          id: generateID(),
          fig: "😯",
          title: "wow",
          count: generateRandomNums(),
        },
        heart: {
          id: generateID(),
          fig: "♥",
          title: "heart",
          count: generateRandomNums(),
        },
        rocket: {
          id: generateID(),
          fig: "🚀",
          title: "rocket",
          count: generateRandomNums(),
        },
        coffee: {
          id: generateID(),
          fig: "☕",
          title: "coffee",
          count: generateRandomNums(),
        },
      };
    }

    const modifiePost = (post) => ({
      ...post,
      id: `random-post--${post.id}`,
      userId: `random-user--${post.userId}`,
      reactions: generateReaction(),
      date: generateRandomDate(),
    });

    const res = await fetch("https://jsonplaceholder.typicode.com/posts");
    const data = await res.json();

    const modified = data.map((post) => modifiePost(post));

    fs.writeFileSync(
      "./write-file/output/posts.json",
      JSON.stringify(modified)
    );
  } catch (error) {
    console.log(error);
  }
}

async function writeUsers() {
  try {
    function modifieUser(user) {
      return {
        ...user,
        id: `random-user--${user.id}`,
        fig: "",
      };
    }

    const res = await fetch("https://jsonplaceholder.typicode.com/users");
    const data = await res.json();

    const modified = data.map((user) => modifieUser(user));

    fs.writeFileSync(
      "./write-file/output/users.json",
      JSON.stringify(modified)
    );
  } catch (error) {
    console.log(error);
  }
}

async function writeComments() {
  try {
    function modifieUser(comment) {
      return {
        ...comment,
        id: `random-comment--${comment.id}`,
        postId: `random-post--${comment.postId}`,
      };
    }

    const res = await fetch("https://jsonplaceholder.typicode.com/comments");
    const data = await res.json();

    const modified = data.map((comment) => modifieUser(comment));

    fs.writeFileSync(
      "./write-file/output/comments.json",
      JSON.stringify(modified)
    );
  } catch (error) {
    console.log(error);
  }
}

function writeCustom({ fileName, docCount = 1 }) {
  const data = [];

  for (let i = 0; i < docCount; i++) {
    data.push({
      img: `/assets/gallery/gallery-${32 + i}.webp`,
      productId: `productId-${32 + i}`,
    });
  }

  console.log(data);

  fs.writeFileSync(
    `./write-file/output/${fileName || "custom"}.json`,
    JSON.stringify(data)
  );
}

function initJsonPlacholder() {
  writeCustom({ docCount: 17 });
}

initJsonPlacholder();
