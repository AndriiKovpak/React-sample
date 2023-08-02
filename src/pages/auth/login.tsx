import { useFormik } from "formik";
import { NextPage } from "next";
import { withUrqlClient } from "next-urql";
import Link from "next/link";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import * as yup from "yup";
import { NoSidebarLayout } from "../../components/layout/NoSidebarLayout";
import { nextUrqlClient } from "../../graphql/urql-client/nextUrqlClient";
import { useLoginMutation } from "../../graphql/urql-codegen/code";
import { useToastFormikErrors } from "../../hooks/useToastFormikErrors";
import { useStoreActions } from "../../store/global.store";
import { Environment } from "../../utils/environment";

interface IFormData {
  email: string;
  password: string;
}

const validationSchema: yup.ObjectSchema<IFormData> = yup.object({
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
});

const Page: NextPage = () => {
  const router = useRouter();
  const { setLoginState } = useStoreActions((actions) => actions.settings);
  const [, loginFN] = useLoginMutation();

  const { handleSubmit, handleChange, handleBlur, values, errors, touched, isSubmitting } = useFormik<IFormData>({
    initialValues: {
      email: Environment.isBrowser() ? document.querySelector<HTMLInputElement>('input[name="email"]')?.value ?? "" : "",
      password: Environment.isBrowser() ? document.querySelector<HTMLInputElement>('input[name="password"]')?.value ?? "" : "",
    },
    validationSchema,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async ({ password, email }, {}) => {
      const { data, error } = await loginFN({ email, password });
      if (!data || error) {
        if (error) {
          console.error(error);
          toast.error(error.message, { position: toast.POSITION.BOTTOM_CENTER });
        }
      } else {
        setLoginState(data.login);
        if (data.login.samplePermission) {
          await router.push("/internal");
        } else {
          await router.push("/dashboard");
        }
      }
    },
  });

  useToastFormikErrors(errors, touched);

  return (
    <div>
      <NoSidebarLayout>
        <form autoComplete="on" onSubmit={handleSubmit}>
          <div className="relative h-[1185px] w-full bg-neutral-950">
            <div className="left-[147px]">
              <div className="absolute left-0 top-[894px] inline-flex h-[1.19px] w-[1440px] items-center justify-center"></div>
              <div className="absolute left-[147px] top-[206px] h-[412px] w-[433px]">
                <div className="absolute left-0 top-[169px] h-[243px] w-[400px]">
                  <div className="absolute left-0 top-0 text-[13px] font-normal text-white text-opacity-90">Email</div>
                  <div className="absolute left-0 top-[93px] text-[13px] font-normal text-white text-opacity-90">Password</div>
                  <input
                    className="absolute left-0 top-[25px] h-[45px] w-[400px] rounded-md border border-gray-400 border-opacity-10 bg-zinc-900 bg-opacity-40 text-white"
                    type="text"
                    placeholder="Write your Email address"
                    name="email"
                    autoComplete="email"
                    value={values.email}
                    onChange={handleChange}
                    onInput={handleChange}
                    onBlur={handleBlur}
                  />
                  <input
                    className="absolute left-0 top-[118px] h-[45px] w-[400px] rounded-md border border-gray-400 border-opacity-10 bg-zinc-900 bg-opacity-40 text-white"
                    type="password"
                    placeholder="Write your password"
                    autoComplete="password"
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    onInput={handleChange}
                    onBlur={handleBlur}
                  />
                  <button
                    className="absolute left-0 top-[203px] inline-flex h-10 w-[120px] items-center justify-center gap-0.5 rounded-[100px] bg-indigo-700 px-3"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    <span className="text-[13px] font-medium text-white">{isSubmitting ? "Submitting" : "Login"}</span>
                  </button>
                </div>
                <div className="secondary absolute left-0 top-0 w-[196px] text-[15px] font-medium text-customPurple">Log in</div>
                <div className="absolute left-0 top-[36px] text-[40px] font-normal leading-10 text-white">Welcome to React</div>
                <div className="absolute left-0 top-[94px] h-[35px] w-[313px]">
                  <span className="text-[17px] font-normal leading-7 text-gray-400">Don’t have an account? </span>
                  <span className="text-[17px] font-normal leading-7 text-white underline">
                    <a href="/auth/register">Click here</a>
                  </span>
                </div>
                <div className="absolute left-[239px] top-[340px] flex h-6 w-[161px] items-center justify-between text-right text-[13px] font-normal text-gray-400 underline">
                  <a href="/auth/forgot-password">Forgot your password?</a>
                </div>
              </div>
              <div className="absolute left-[832px] top-[206px] h-[435px] w-[1px] rounded-lg bg-gray-600 bg-opacity-50"></div>
              <div className="absolute left-[1051px] top-[636.95px] h-2.5 w-[86px]">
                <div className="absolute left-0 top-0">
                  <img className="absolute left-[76px] top-0 h-2.5 w-2.5" src="https://via.placeholder.com/10x10" />
                  <img className="absolute left-[50px] top-0 h-2.5 w-2.5" src="https://via.placeholder.com/10x10" />
                  <img className="absolute left-0 top-0 h-2.5 w-2.5" src="https://via.placeholder.com/10x10" />
                </div>
              </div>
              <div className="absolute left-[931px] top-[206px] h-[380.95px] w-[335.16px]">
                <div className="absolute left-0 top-[50.95px] h-[330px] w-[300px]">
                  <div className="absolute left-[98px] top-[50px] text-[15px] font-medium text-white">Sean Farmer</div>
                  <div className="absolute left-[98px] top-[74px] text-[15px] font-normal leading-normal text-gray-400">CEO Slack</div>
                  <div className="absolute left-[30px] top-[131px] h-[161px] w-60 text-[17px] font-normal leading-7 text-gray-400">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
                    aliquat enim ad minim veniam.
                  </div>
                  <div className="absolute left-[30px] top-[49px] h-[45px] w-[45px]">
                    <img src="/mask.svg" alt="Ceo image" />
                  </div>
                </div>
              </div>
              <div className="absolute left-0 top-[895px] h-[290px] w-[1440px]">
                <div className="absolute left-0 top-0 h-[290px] w-[1440px] bg-neutral-950"></div>
                <div className="absolute left-0 top-[251.81px] h-[31.03px] w-[1440px]">
                  <div className="absolute left-[1055px] top-[8px] text-right text-[14px] font-medium text-gray-600">
                    ©2023 - Form | All right reserved
                  </div>
                  <div className="absolute left-[443px] top-[8px] text-[14px] font-medium text-gray-600">Pattents</div>
                  <div className="absolute left-[345px] top-[8px] text-[14px] font-medium text-gray-600">Legal</div>
                  <div className="absolute left-[147px] top-[8px] text-[14px] font-medium text-gray-600">Terms and conditions</div>
                  <div className="absolute left-0 top-0 inline-flex h-[1.19px] w-[1440px] items-center justify-center"></div>
                </div>
                <div className="absolute left-[1127px] top-[40px] inline-flex h-[190.95px] w-[165px] flex-col items-center justify-center">
                  <div className="h-[188.56px] w-[165px]"></div>
                </div>
                <div className="absolute left-[834px] top-[35px] h-[190.95px] w-[165px]">
                  <div className="absolute left-0 top-[2.39px] h-[188.56px] w-[165px]"></div>
                  <div className="absolute left-0 top-[138px] text-[14px] font-medium text-gray-400">Linkedin</div>
                  <div className="absolute left-0 top-[109px] text-[14px] font-medium text-gray-400">Instagram</div>
                  <div className="absolute left-0 top-[80px] text-[14px] font-medium text-gray-400">Twitter</div>
                  <div className="absolute left-0 top-[51px] text-[14px] font-medium text-gray-400">Facebook</div>
                  <div className="absolute left-0 top-[15px] text-[14px] font-medium text-white">Connect</div>
                </div>
                <div className="absolute left-[638px] top-[35px] h-[190.95px] w-[165px]">
                  <div className="absolute left-0 top-[2.39px] h-[188.56px] w-[165px]"></div>
                  <div className="absolute left-0 top-[138px] text-[14px] font-medium text-gray-400">Resources</div>
                  <div className="absolute left-0 top-[109px] text-[14px] font-medium text-gray-400">Pricing</div>
                  <div className="absolute left-0 top-[80px] text-[14px] font-medium text-gray-400">About us</div>
                  <div className="absolute left-0 top-[51px] text-[14px] font-medium text-gray-400">Home</div>
                  <div className="absolute left-0 top-[15px] text-[14px] font-medium text-white">Menu</div>
                </div>
                <div className="absolute left-[147px] top-[155px] text-[14px] font-medium text-gray-400">6116 Willa River Suite 610</div>
                <div className="absolute left-[147px] top-[126px] text-[14px] font-medium text-gray-400">882-587-3025</div>
                <div className="absolute left-[147px] top-[97px] text-[14px] font-medium text-gray-400">info@form.com</div>
                <div className="absolute left-[147px] top-[58px] h-[25px] w-[134px]">
                  <div className="absolute top-[2px] text-center">
                    <Link href="/" passHref className="flex items-center">
                      <img src="/LOGO.png" alt="Lobbymatic Logo" className="mr-2 h-5 w-auto" />
                    </Link>
                  </div>
                  <div className="absolute left-0 top-0 h-[21.10px] w-[28px]">
                    <div className="absolute left-0 top-0 h-[21.10px] w-[18.04px]"></div>
                  </div>
                </div>
                <div className="absolute left-[1028px] top-[54px] h-[119px] w-[265px]">
                  <div className="absolute left-[27px] top-[62px] h-[25px] w-[85px] text-[15px] font-normal leading-normal text-zinc-300 text-opacity-60">
                    Your email
                  </div>
                  <div className="absolute left-[18px] top-[18px] h-[25px] w-[85px] text-[14px] font-semibold text-customPink">Join us</div>
                  <div className="absolute left-[10px] top-[54px] h-10 w-[246px] rounded-[100px] bg-zinc-300 bg-opacity-20"></div>
                  <div className="absolute left-[152px] top-[58px] inline-flex h-8 w-[100px] items-center justify-center gap-0.5 rounded-[100px] bg-gray-600 px-3">
                    <div className="text-[13px] font-medium text-white">Get started</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </NoSidebarLayout>
    </div>
  );
};

export default withUrqlClient(nextUrqlClient)(Page);
