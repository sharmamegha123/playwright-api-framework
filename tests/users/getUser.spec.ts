import { test, expect } from "@playwright/test";
import { ApiManager } from "../../src/core/ApiManager";
import { UserBuilder } from "../../src/builders/UserBuilder";
import { Polling } from "../../src/utils/polling";
test("Get User", async ({ request }) => {
  const api = new ApiManager(request,process.env.BASE_URL!);

  const response = await api.user.getUser(2);

  expect(response.status()).toBe(200);
  const body = await response.json();
  expect(body.data.id).toBe(2);

  expect(body.data.email).toContain("@");

  expect(body.data.first_name).toBeTruthy();
});

test("Create User", async ({ request }) => {
  const api = new ApiManager(request,process.env.BASE_URL!);
  const payload = new UserBuilder()
    .withName("John Doe")
    .withJob("Software Engineer")
    .build();
  const response = await api.user.createUser(payload);
  console.log("Response:", response);
  expect(response.status).toBe(201);
  expect(response.body.name).toBe(payload.name);
  expect(response.body.job).toBe(payload.job);
  expect(response.body.id).toBeTruthy();
  expect(response.body.createdAt).toBeTruthy();

 /*  const order = await Polling.waitUntil(
    () => api.user.getUser(2),

    (result) => response.body.job === "COMPLETED",

    {
      timeout: 30000,
      interval: 2000,
      retryOnStatus: [404, 500, 503],
    },
  );

  expect(response.body.job).toBe("COMPLETED");

//playwright polling 

expect.poll(
  async()=>{
    const response=await api.user.getUser(2);
    return response.status(),{
     
    }

  }).toBe("Completed")
 */
});
