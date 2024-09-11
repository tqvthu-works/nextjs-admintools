import prismaClient from '@app/lib/prisma'
import type { IntegrationShop, Onboarding, Shop, Subscription } from '@prisma/client';
export type TShopDetail = {
  shop: Partial<Shop> & { subscription: any}|null & { onboarding: any}|null;
  integrations: IntegrationShop[];
  // onboarding: Partial<Onboarding>;
  onboarding: TOnboarding;
}
type TOnboarding = {
  total_complete: number;
  step_complete: {
    select_theme: boolean;
    setup_branding: boolean;
    design_mobile_app: boolean;
    preview_mobile_app: boolean;
    app_submission: boolean;
  }
}
export const getShopDetail = async (shopId: string): Promise<TShopDetail> => {
  const shop = await prismaClient.shop.findUnique({
    where: {
      id: Number(shopId),
    },
    // include: {
    //   subscription: true,
    //   onboarding: true,
    // },
    select: {
      id: true,
      name: true,
      shopify_domain: true,
      created_at: true,
      plan_name: true,
      is_test: true,
      is_expert: true,
      email: true,
      subscription: {
        select: {
          name: true,
        }
      },
      onboarding: {
        select: {
          select_theme: true,
          setup_branding: true,
          design_mobile_app: true,
          preview_mobile_app: true,
          app_submission: true,
        }
      }
    }
  })
  let onboarding: TOnboarding = {
    total_complete: Object.values(shop?.onboarding!).filter(step => step === true).length,
    step_complete: {
      select_theme: shop?.onboarding?.select_theme ?? false,
      setup_branding: shop?.onboarding?.setup_branding ?? false,
      design_mobile_app: shop?.onboarding?.design_mobile_app ?? false,
      preview_mobile_app: shop?.onboarding?.preview_mobile_app ?? false,
      app_submission: shop?.onboarding?.app_submission ?? false,
    }
  }
  // a = {
  //   select_theme: true,
  //   setup_branding: true,
  //   design_mobile_app: true,
  //   preview_mobile_app: true,
  //   app_submission: true
  // }
  // count all step with value true
  const count = Object.values(shop?.onboarding!).filter(step => step === true).length;
  console.log(shop?.onboarding);
  const integrations = await prismaClient.integrationShop.findMany({
    where: {
      shop_id: Number(shopId),
    },
  });
  // let onboarding = await prismaClient.onboarding.findFirst({
  //   where: {
  //     shop_id: Number(shopId),
  //   },
  // }) as Partial<Onboarding>;
  // onboarding = onboarding ? onboarding : { 
  //   select_theme: false,
  //   setup_branding: false,
  //   design_mobile_app: false,
  //   preview_mobile_app: false,
  //   app_submission: false,
  // };
  return {
    shop: shop,
    integrations: integrations,
    onboarding: onboarding,
  }
}