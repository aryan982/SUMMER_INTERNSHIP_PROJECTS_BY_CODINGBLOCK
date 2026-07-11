
let activeFundsRaised = 10000; 
let userTotalContributions = 0;
let userProjectsSupportedCount = 0;


function backCampaign(campaignId, finalGoal) {
    const inputElement = document.getElementById(`amount-${campaignId}`);
    const inputAmount = parseFloat(inputElement.value);

    if (isNaN(inputAmount) || inputAmount <= 0) {
        alert("Please enter a valid pledge amount.");
        return;
    }

    
    const acceptTerms = confirm(`Confirm your contribution of $${inputAmount}.\n(Note: Stripe Escrow locks funds until campaign hits 100% target goal)`);
    
    if (acceptTerms) {
        // Calculate new totals
        activeFundsRaised += inputAmount;
        userTotalContributions += inputAmount;
        userProjectsSupportedCount = 1; 

        document.getElementById(`raised-${campaignId}`).innerText = `$${activeFundsRaised.toLocaleString()}`;
        
        let newProgressPercentage = (activeFundsRaised / finalGoal) * 100;
        if (newProgressPercentage > 100) newProgressPercentage = 100; 
        
        document.getElementById(`progress-bar-${campaignId}`).style.width = `${newProgressPercentage}%`;

        
        document.getElementById("total-contributed").innerText = `$${userTotalContributions.toLocaleString()}`;
        document.getElementById("projects-supported").innerText = userProjectsSupportedCount;

   
        inputElement.value = "";
        alert("Thank you for your pledge support!");
    }
}

function filterCategory(selectedTag) {
   
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');

    const projectCards = document.querySelectorAll('.card');
    projectCards.forEach(card => {
        if (selectedTag === 'all' || card.getAttribute('data-category') === selectedTag) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

function handleCreateCampaign(event) {
    event.preventDefault();
    
    const title = document.getElementById('title').value;
    const goal = document.getElementById('goal').value;

    alert(`Success! "${title}" (Target Goal: $${parseFloat(goal).toLocaleString()}) has been queued safely for Admin Moderation review before deployment.`);
    document.getElementById('campaignForm').reset();
}