import ProfileView from "@/views/ProfileView.vue";
import { mount } from "@vue/test-utils";

describe("profile testing", () => {
  test("test profile data", () => {
    const wrapper = mount(ProfileView, {});

    console.log(wrapper.html());
    console.log(wrapper.vm["user"]);
    wrapper.vm["user"].email = "quangphuctq";
    console.log(wrapper.html());

    console.log(wrapper.vm.user);
  });
});
