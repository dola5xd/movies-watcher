import { Client, Account, Storage, ID } from "appwrite";

export const client = new Client();
const projectID: string = process.env.NEXT_PUBLIC_PROJECT_ID!;
const bucketID: string = process.env.NEXT_PUBLIC_BUCKET_ID!;

client.setEndpoint("https://cloud.appwrite.io/v1").setProject(projectID);

export const account = new Account(client);
export const storage = new Storage(client);
export { ID } from "appwrite";

export async function uploadAvatar(file: File) {
  if (!file || !(file instanceof File)) {
    console.error("Invalid file:", file);
    throw new Error("Invalid file. Please provide a valid file.");
  }

  console.log("file details:", {
    name: file.name,
    size: file.size,
    type: file.type,
  });

  try {
    // Upload the file to Appwrite storage
    const response = await storage.createFile(bucketID, ID.unique(), file);

    console.log("response: ", response);

    // Construct the file URL
    const fileUrl = `https://cloud.appwrite.io/v1/storage/buckets/${bucketID}/files/${response.$id}/view?project=${projectID}`;

    const prefs = await account.getPrefs();
    // Update the user's profile with the avatar URL
    await account.updatePrefs({ ...prefs, avatar: fileUrl });
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error uploading avatar:", error.message);
    } else {
      console.error("Unexpected error:", error);
    }
  }
}

export async function updateUserData(
  name: string,
  avatar: FileList,
  previousAvatarId: string | null
) {
  try {
    // Update user name
    await account.updateName(name); // Upload the new avatar if provided
    if (avatar && avatar.length > 0) {
      // Delete the previous avatar if it exists
      if (previousAvatarId) {
        try {
          await storage.deleteFile(bucketID, previousAvatarId);
        } catch (error) {
          console.error("Error deleting previous avatar:", error);
        }
      }
    }
    const file = avatar[0];
    const response = await storage.createFile(bucketID, ID.unique(), file); // Get the file URL
    const fileUrl = `https://cloud.appwrite.io/v1/storage/buckets/${bucketID}/files/${response.$id}/view?project=${projectID}`;
    const prefs = await account.getPrefs(); // Update the user's profile with the avatar URL
    await account.updatePrefs({ ...prefs, avatar: fileUrl }); // Store the new avatar file ID in the user's preferences
    await account.updatePrefs({ ...prefs, avatarId: response.$id });
    console.log("User data updated successfully");
  } catch (error) {
    console.error("Error updating user data:", error);
  }
}

export async function getSavedShows() {
  try {
    const prefs = await account.getPrefs();
    return prefs.savedShows || [];
  } catch (error) {
    console.error("Error fetching saved shows:", error);
    return [];
  }
}
