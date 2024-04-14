import { Client, Account, Storage, Avatars, Databases, ID } from "react-native-appwrite";

export const config = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.expo.indux",
  projectId: "661c5eb6463e443e4bf3",
  databaseId: "661c610a31f8613057b6",
  userCollectionId: "661c612ab9b4e92eb8f5",
  videoCollectionId: "661c6140b53a5f29e554",
  storageId: "661c6230bad8361ed287",
};

const client = new Client();

client
  .setEndpoint(config.endpoint)
  .setProject(config.projectId)
  .setPlatform(config.platform);

const account = new Account(client);
const storage = new Storage(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

export const createUser = ({ email, password, username }) => {
  // Register User
  account.create(ID.unique(), email, password, username).then(
    function (response) {
      console.log(response);
    },
    function (error) {
      console.log(error);
    }
  );
};
