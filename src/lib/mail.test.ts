import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  correctFoundationDomain,
  isPlaceholderSmtpPassword,
  officeEmailAddresses,
  parseEmailList,
} from "./mail";

describe("mail helpers", () => {
  it("corrects the anntanandas domain typo", () => {
    assert.equal(
      correctFoundationDomain("mail.anntanandasfoundation.com"),
      "mail.anntnandasfoundation.com",
    );
    assert.equal(
      correctFoundationDomain("info@anntanandasfoundation.com"),
      "info@anntnandasfoundation.com",
    );
    assert.equal(
      correctFoundationDomain("info@anntnandasfoundation.com"),
      "info@anntnandasfoundation.com",
    );
  });

  it("rejects placeholder SMTP passwords", () => {
    assert.equal(isPlaceholderSmtpPassword("YOUR_EMAIL_PASSWORD"), true);
    assert.equal(isPlaceholderSmtpPassword("real-secret"), false);
  });

  it("parses and de-duplicates office recipients", () => {
    const emails = parseEmailList("info@anntanandasfoundation.com, info@anntnandasfoundation.com");
    assert.deepEqual(emails, ["info@anntnandasfoundation.com"]);
  });

  it("always includes the foundation inbox", () => {
    const previous = process.env.ADMIN_EMAIL;
    const previousUser = process.env.SMTP_USER;
    process.env.ADMIN_EMAIL = "info@anntanandasfoundation.com";
    process.env.SMTP_USER = "info@anntanandasfoundation.com";
    try {
      assert.deepEqual(officeEmailAddresses(), ["info@anntnandasfoundation.com"]);
    } finally {
      if (previous === undefined) delete process.env.ADMIN_EMAIL;
      else process.env.ADMIN_EMAIL = previous;
      if (previousUser === undefined) delete process.env.SMTP_USER;
      else process.env.SMTP_USER = previousUser;
    }
  });
});
