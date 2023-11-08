const fs = require("fs");
const filePathFirst = "./example.txt";
const filePathSecond = "./exampleTwo.txt";

// Asynchronous method
fs.readFile(filePathFirst, "utf-8", (err, data) => {
  if (err) {
    console.error(`Error reading file asynchronously: ${filePathFirst}`);
    console.error(err);
  } else {
    console.log(`Contents of ${filePathFirst} (asynchronous read):`);
    console.log(data);
  }
});

// Synchronous method
const fileContent = fs.readFileSync(filePathFirst, "utf-8");
console.log(`Contents of ${filePathFirst} (synchronous read):`);
console.log(fileContent);

// Function to read a file asynchronously and return a promise
function readingFile(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, "utf-8", (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}

// Handling promises asynchronously
async function handlePromise() {
  try {
    const fileContent = await readingFile(filePathFirst);
    const fileContentSecond = await readingFile(filePathSecond);
    console.log(fileContent);
    console.log(fileContentSecond);
  } catch (error) {
    console.error(error);
  }
}

// Calling the function to handle promises
handlePromise();

// Content to be written to a file
const content = "This is the content to be written to the file.";

// Function to write data to a file asynchronously and return a promise
function writeFileAsync(filePath, data) {
  return new Promise((resolve, reject) => {
    fs.writeFile(filePath, data, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve("The file has been saved!");
      }
    });
  });
}

// Handling writing to file asynchronously
async function handleWriteFileAsync() {
  try {
    const result = await writeFileAsync(filePathFirst, content);
    console.log(result);
  } catch (error) {
    console.error(error);
  }
}

// Calling the function to handle writing to file asynchronously
handleWriteFileAsync();

// Writing to a file synchronously
try {
  fs.writeFileSync(
    filePathSecond,
    "This is the content to be written to the second file."
  );
  console.log("The file has been saved synchronously!");
} catch (error) {
  console.error(error);
}

// Appending content to a file asynchronously
fs.appendFile(
  filePathSecond,
  "This is the content to be appended to the second file.",
  (err) => {
    if (err) {
      console.error(err);
    }
  }
);

// Checking the stats of the second file
fs.stat(filePathSecond, (err, stats) => {
  if (err) {
    console.log(err);
  }

  if (stats.isFile()) {
    console.log(stats);
  }
});
