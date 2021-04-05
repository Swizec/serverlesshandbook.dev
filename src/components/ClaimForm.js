import React from "react"
import { useEmailForm } from "@swizec/gatsby-theme-course-platform/src/components/FormCK"
import BouncingLoader from "@swizec/gatsby-theme-course-platform/src/components/BouncingLoader"
import { Flex, Label, Input, Box, Button, Text, Heading } from "theme-ui"

export const ClaimForm = () => {
  const {
    formSuccess,
    onSubmit,
    uniqueId,
    register,
    errors,
    formState,
    submitError,
  } = useEmailForm("claim", () => console.log("done"))

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
      </Flex>
    )
  }

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
        ref={register({ required: true })}
        placeholder="Your name"
      />
      {errors.name && (
        <span>
          <span role="img" aria-label="danger">
            ⚠️
          </span>{" "}
          Name is required
        </span>
      )}

      <Label htmlFor={`${uniqueId}-email`} sx={{ mt: 2 }}>
        Your Email
      </Label>
      <Input
        id={`${uniqueId}-email`}
        type="email"
        name="email"
        ref={register({
          required: "⚠️ E-mail is required",
          pattern: {
            value:
              "^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$",
            message: "⚠️ Invalid email address",
          },
        })}
        placeholder="Your email address"
      />
      {errors.email && <span>{errors.email.message}</span>}

      <Label htmlFor={`${uniqueId}-sharelink`} sx={{ mt: 2 }}>
        Share link
      </Label>
      <Input
        id={`${uniqueId}-sharelink`}
        type="text"
        name="share_link"
        ref={register({
          required: "⚠️ Share link is required",
        })}
        placeholder="Where did you share? I'd love to see"
      />
      {errors.share_link && <span>{errors.share_link.message}</span>}

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
          ref={register}
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
