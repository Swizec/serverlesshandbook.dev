import React from "react"
import { useEmailForm } from "@swizec/gatsby-theme-course-platform/src/components/FormCK"
import BouncingLoader from "@swizec/gatsby-theme-course-platform/src/components/BouncingLoader"
import { Flex, Label, Input, Box, Button, Text, Heading, Image } from "theme-ui"
import emailRobot from "@swizec/gatsby-theme-course-platform/src/images/email-robot.gif"
import { useLocalStorage } from "./useLocalStorage"

async function createUser({ name, email }) {
  await fetch(
    "https://tq43ps6oh2.execute-api.us-east-1.amazonaws.com/dev/gumroadPing",
    {
      method: "POST",
      mode: "no-cors",
      body: new URLSearchParams({
        product_permalink: "https://gum.co/NsUlA",
        email,
        full_name: name,
      }).toString(),
    }
  )
}

export const ClaimForm = () => {
  const [unlockHandbook, setUnlockHandbook] = useLocalStorage("unlock_handbook")
  const [saleId, setSaleId] = useLocalStorage("sale_id")

  const {
    formSuccess,
    onSubmit,
    uniqueId,
    register,
    formState,
    submitError,
  } = useEmailForm("claim", async (formData) => {
    await createUser(formData)
    setUnlockHandbook(true)
    setSaleId("came-from-a-claim")
    window.location.href = "/thanks"
  })

  if (formSuccess) {
    return (
      <Flex
        sx={{
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <Heading>Thank you ❤️</Heading>
        <p>
          My robots have sent email that tells you how to finish setting up your
          account. Redirecting you to the first chapter with a temporary unlock.
        </p>
        <p>Finish setting up your account and you can login from any device.</p>
        <Image src={emailRobot} />
      </Flex>
    )
  }

  console.log(formState)

  return (
    <Flex
      as="form"
      onSubmit={onSubmit}
      sx={{
        justifyContent: "center",
        flexDirection: "column",
        "& .address": { display: "none" },
      }}
    >
      <Label htmlFor={`${uniqueId}-name`}>Your Name</Label>
      <Input
        id={`${uniqueId}-name`}
        type="text"
        name="name"
        {...register("name", {
          required: "⚠️ Name is required",
          message: "⚠️ Name is required",
        })}
        placeholder="Your name"
      />
      {formState.errors.name && <span>{formState.errors.name.message}</span>}

      <Label htmlFor={`${uniqueId}-email`} sx={{ mt: 2 }}>
        Your Email
      </Label>
      <Input
        id={`${uniqueId}-email`}
        type="email"
        name="email"
        {...register("email", {
          required: "⚠️ E-mail is required",
          pattern: {
            value:
              "^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$",
            message: "⚠️ Invalid email address",
          },
        })}
        placeholder="Your email address"
      />
      {formState.errors.email && <span>{formState.errors.email.message}</span>}

      <Label htmlFor={`${uniqueId}-sharelink`} sx={{ mt: 2 }}>
        Share link
      </Label>
      <Input
        id={`${uniqueId}-sharelink`}
        type="text"
        name="share_link"
        {...register("share_link", {
          required: "⚠️ Share link is required",
          message: "⚠️ Share link is required",
        })}
        placeholder="Where did you share? I'd love to see your post"
      />
      {formState.errors.share_link && (
        <span>{formState.errors.share_link.message}</span>
      )}

      <Box className="address">
        <Label htmlFor={`${uniqueId}-address`} className="required">
          Your Address
        </Label>
        <input
          className="required"
          autoComplete="nope"
          type="text"
          id={`${uniqueId}-address`}
          name="address"
          {...register}
          placeholder="Your address here"
        />
      </Box>
      <Button
        type="submit"
        variant="buy-shiny"
        disabled={formState.isSubmitting}
        sx={{ mt: 2 }}
      >
        {formState.isSubmitting ? <BouncingLoader /> : "Claim my copy"}
      </Button>

      {submitError && <p dangerouslySetInnerHTML={{ __html: submitError }}></p>}

      <Text sx={{ fontSize: "0.8em", mb: 2, textAlign: "center" }}>
        I like privacy too. No spam, no selling your data.
      </Text>
    </Flex>
  )
}
