import gql from "graphql-tag";

export const UPDATE_INFORMATION = gql`
  mutation updateInformation($object: user_data_userInformation_insert_input!) {
    insert_user_data_userInformation_one(object: $object) {
      Age
      Batch
      Id
      Name
    }
  }
`;

export const UPDATE_PAYMENT = gql`
  mutation MyMutation($object: user_data_payment_insert_input!) {
    insert_user_data_payment_one(object: $object) {
      id
      payment_status
    }
  }
`;
