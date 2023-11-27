import styled from "styled-components";
import {Collapse} from 'antd'
const { Panel } = Collapse;

const Paragraph = styled.p `
    font-weight: normal ;

`

const Faq = () => {
  return (
    <div className='block-faqpage'>
      <div className="faq-container">

        <h2>FAQ</h2><br></br>
        <Collapse className ="collapse" accordion defaultActiveKey={['1']}>
            <Panel className='headerFAQ' header= "How can I join the meetup group?" key="1">
                <Paragraph > The meetup is designed to bring together dog
                     owners who share a common interest in going 
                     for walks with their dogs. It's an opportunity
                      to socialise, share experiences, and enjoy the
                       company of fellow dog enthusiasts.</Paragraph >
            </Panel>

            <Panel className='headerFAQ'  header= "When and where do the walks take place?" key="2">
            <Paragraph > Walks are typically scheduled on weekends or
                 evenings to accommodate different schedules.
                  Locations vary, and details for each walk,
                   including meeting points, are shared in advance
                    on the Meetup page and through event notifications.</Paragraph >
            </Panel>


           <Panel className='headerFAQ' header="Can I bring my dog even if they are not well-socialised?" key="3">
            <div className='paragraph'>
            <Paragraph >We encourage responsible dog ownership.
                 If your dog is still in the process of socialisation,
                  please ensure they are comfortable around other dogs.
                   It's important to be mindful of the group dynamic to
                    ensure a positive experience for all.</Paragraph >

             </div>
            </Panel>

            <Panel className='headerFAQ'  header= "Are there any specific rules during the walks?" key="4">
            <Paragraph >Yes, we have a few guidelines to ensure
                 a safe and enjoyable experience.
                 All dogs should be on a leash, and owners
                  are responsible for cleaning up after their pets. 
                  Additionally, be aware of the needs and comfort
                   levels of other dogs in the group.</Paragraph >

            </Panel>

            <Panel className='headerFAQ'  header= "What should I bring to the meetup?" key="5">
            <Paragraph > Essentials include a leash, waste bags,
                 and water for both you and your dog.
                Depending on the weather, it's advisable
                to bring appropriate clothing, and feel
                free to bring any toys or treats your dog enjoys.</Paragraph >


            </Panel> 
            
            <Panel className='headerFAQ'  header= "Can I suggest a location for a future walk?" key="6">
            <Paragraph > Absolutely! We love hearing suggestions
                 from our members. Feel free to post your
                  ideas on the Meetup page or reach out to 
                  the organizers directly.</Paragraph >

            </Panel> 
            
            <Panel className='headerFAQ'  header= "How can I connect with other members outside of scheduled walks?" key="7">
            <Paragraph  className='answerFAQ'> Our Meetup page has a discussion board where
                 you can chat with other members, share tips,
                  and plan informal get-togethers. 
                  Additionally, we encourage socialising before
                   and after walks to strengthen the community.</Paragraph >

            </Panel> 
            
            <Panel className='headerFAQ' header= "Are there any fees associated with the meetup?" key="8">
            <Paragraph >  No, membership and participation in our walks are free.
                 Any costs associated with specific events, if applicable,
                 will be clearly communicated in advance.</Paragraph >

            </Panel> 
        </Collapse>
      </div>
    </div>
  )
}

export default Faq
