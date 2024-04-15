import {
  View,
  Text,
  Image,
  Alert,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { router } from "expo-router";
import { icons } from "../../constants";
import { ResizeMode, Video } from "expo-av";
import * as ImagePicker from "expo-image-picker";
import { createVideo } from "../../lib/appwrite";
import { FormField } from "../../components/FormField";
import { CustomButton } from "../../components/CustomButton";
import { SafeAreaView } from "react-native-safe-area-context";
import { useGlobalContext } from "../../context/GlobalProvider";

const Create = () => {
  const { user } = useGlobalContext();
  const [isUploading, setIsUploading] = React.useState(false);
  const [form, setForm] = React.useState({
    title: "",
    video: null,
    thumbnail: null,
    prompt: "",
  });

  const submit = async () => {
    if (
      form.title === "" ||
      form.video === null ||
      form.prompt === "" ||
      form.thumbnail === null
    ) {
      Alert.alert("Error: Missing Fields", "Please fill in all fields");
    }

    setIsUploading(true);
    try {
      console.log(form)
      await createVideo({ ...form, userId: user.$id });

      Alert.alert("Success", "Video uploaded successfully");
      router.push("/home");
    } catch (e) {
      console.error(JSON.stringify(e, null, 2));
      Alert.alert("Error", e.message);
    } finally {
      setIsUploading(false);
      setForm({
        title: "",
        video: null,
        thumbnail: null,
        prompt: "",
      });
    }
  };

  const openPicker = async (selectType) => {
    const res = await ImagePicker.launchImageLibraryAsync({
      mediaTypes:
        selectType === "image"
          ? ImagePicker.MediaTypeOptions.Images
          : ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!res.canceled) {
      if (selectType === "image") {
        setForm({ ...form, thumbnail: res.assets[0] });
      } else if (selectType === "video") {
        setForm({ ...form, video: res.assets[0] });
      }
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView className="px-4 my-6">
        <Text className="text-2xl text-white font-psemibold">Upload Video</Text>

        <FormField
          title="Video Title"
          placeholder="Give your video a title..."
          value={form.title}
          handleChangeText={(e) => setForm({ ...form, title: e })}
          otherStyles="mt-10"
        />

        <View className="mt-7 space-y-2">
          <Text className="text-base text-gray-100 font-pmedium">
            Upload Video
          </Text>
          <TouchableOpacity onPress={() => openPicker("video")}>
            {form.video ? (
              <Video
                source={{ uri: form.video.uri }}
                className="w-full h-64 rounded-2xl"
                resizeMode={ResizeMode.COVER}
              />
            ) : (
              <View className="w-full h-40 px-4 bg-black-100 rounded-2xl justify-center items-center">
                <View className="w-14 h-14 border border-dashed border-secondary-100 justify-center items-center">
                  <Image
                    source={icons.upload}
                    resizeMode="contain"
                    className="w-1/2 h-1/2"
                  />
                </View>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <View className="mt-7 space-y-2">
          <Text className="text-base text-gray-100 font-pmedium">
            Thumbnail Image
          </Text>
          <TouchableOpacity onPress={() => openPicker("image")}>
            {form.thumbnail ? (
              <Image
                source={{ uri: form.thumbnail.uri }}
                resizeMode="cover"
                className="w-full h-64 rounded-2xl"
              />
            ) : (
              <View className="w-full h-40 px-4 bg-black-100 rounded-2xl justify-center items-center border-2 border-black-200 flex-row space-x-2">
                <Image
                  source={icons.upload}
                  resizeMode="contain"
                  className="w-5 h-5"
                />
                <Text className="text-sm text-gray-100 font-pmedium">
                  Choose A File
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <FormField
          title="AI Prompt"
          placeholder="Prompt you used to generate this content..."
          value={form.prompt}
          handleChangeText={(e) => setForm({ ...form, prompt: e })}
          otherStyles="mt-7"
        />

        <CustomButton
          title="Publish"
          handlePress={submit}
          containerStyles={"mt-7"}
          isLoading={isUploading}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Create;
