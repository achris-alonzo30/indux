import { View, Text, ScrollView, Image, Alert } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import { FormField } from "../../components/FormField";
import { CustomButton } from "../../components/CustomButton";
import { Link, router } from "expo-router";
import { getCurrentUser, signIn } from "../../lib/appwrite";
import { useGlobalContext } from "../../context/GlobalProvider";

const SignIn = () => {
  const { setUser, setIsLoggedIn } = useGlobalContext();
  const [form, setForm] = React.useState({
    email: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const onSubmit = async () => {
    if (form.email === "" || form.password === "") {
      Alert.alert("Error", "Missing fields. Please fill in all fields");
    }

    setIsSubmitting(true);
    try {
      await signIn(form.email, form.password);
      const res = await getCurrentUser();
      console.log(res)
      setUser(res);
      setIsLoggedIn(true);

      Alert.alert("Success", "Login successful");
      router.replace("/home");
    } catch (e) {
      console.error(JSON.stringify(e, null, 2));
      Alert.alert("Error", e.message);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full flex justify-center h-full px-4 my-6">
          <Image
            source={images.logo}
            resizeMode="contain"
            className="w-[115px] h-[35px]"
          />
          <Text className="text-2xl text-white text-semibold mt-10 font-psemibold">
            Login to Indux
          </Text>
          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-7"
            keyboardType="email-address"
          />
          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-7"
          />

          <CustomButton
            title="Sign In"
            handlePress={onSubmit}
            containerStyles="mt-7"
            isLoading={isSubmitting}
          />
          <View className="justify-center pt-5 flex-row gap-2">
            <Text className=" text-gray-100 font-pregular">
              Don't have an account?
            </Text>
            <Link href="/sign-up" className="font-psemibold text-secondary">
              Sign Up
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
