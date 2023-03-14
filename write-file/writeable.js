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
          count: generateRandomNums(),
          fig: "👍",
          id: generateID(),
          title: "like",
        },
        wow: {
          count: generateRandomNums(),
          fig: "😯",
          id: generateID(),
          title: "wow",
        },
        heart: {
          count: generateRandomNums(),
          fig: "♥",
          id: generateID(),
          title: "heart",
        },
        rocket: {
          count: generateRandomNums(),
          fig: "🚀",
          id: generateID(),
          title: "rocket",
        },
        coffee: {
          count: generateRandomNums(),
          fig: "☕",
          id: generateID(),
          title: "coffee",
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

    fs.writeFileSync("./write-file/posts.json", JSON.stringify(modified));
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

    fs.writeFileSync("./write-file/users.json", JSON.stringify(modified));
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

    fs.writeFileSync("./write-file/comments.json", JSON.stringify(modified));
  } catch (error) {
    console.log(error);
  }
}

function initJsonPlacholder() {
  writeUsers();
  writeComments();
}

writePosts();
// initJsonPlacholder();
